<?php
declare(strict_types=1);

if (!function_exists('mb_strlen')) {
    function mb_strlen(string $string, ?string $encoding = null): int
    {
        return strlen($string);
    }
}

const CONTACT_CATEGORIES = [
    'work' => '作業服',
    'office' => '事務服',
    'white-coat' => '白衣',
    'scrubs' => 'スクラブ',
    'samue' => '作務衣',
    'security' => '警備服',
    'rain' => '雨衣・レインウェア',
    'print' => 'Tシャツ・プリント',
    'safety' => '安全用品・保護具',
    'shoes' => 'シューズ・靴',
    'winter' => '防寒着・防寒用品',
    'towel' => 'タオル',
    'original' => 'オリジナルユニフォーム',
    'other' => 'その他',
];

function contact_crlf(string $value): bool
{
    return preg_match("/[\r\n]/", $value) === 1;
}

function contact_email(string $value): bool
{
    if ($value === '' || contact_crlf($value) || strlen($value) > 254) {
        return false;
    }
    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false
        && preg_match('/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/', $value) === 1;
}

function contact_validate(array $input): array
{
    $company = trim((string) ($input['company'] ?? ''));
    $name = trim((string) ($input['name'] ?? ''));
    $email = trim((string) ($input['email'] ?? ''));
    $tel = trim((string) ($input['tel'] ?? ''));
    $category = trim((string) ($input['category'] ?? ''));
    $message = trim((string) ($input['message'] ?? ''));
    $website = trim((string) ($input['website'] ?? ''));
    $agree = $input['agree'] ?? false;

    if ($website !== '') {
        return [null, '送信できませんでした。'];
    }
    foreach ([$company, $name, $email, $tel, $category, $message] as $value) {
        if (contact_crlf($value)) {
            return [null, '使用できない文字が含まれています。'];
        }
    }
    if ($company === '' || $name === '' || $email === '' || $message === '') {
        return [null, '必須項目をご入力ください。'];
    }
    if ($agree !== true && $agree !== '1' && $agree !== 'on' && $agree !== 'true') {
        return [null, '個人情報の取り扱いにご同意ください。'];
    }
    if (mb_strlen($company) > 100 || mb_strlen($name) > 80 || mb_strlen($message) > 2000) {
        return [null, '文字数が上限を超えています。'];
    }
    if (!contact_email($email)) {
        return [null, 'メールアドレスの形式が正しくありません。'];
    }
    if ($tel !== '' && (!preg_match('/^[0-9+\-() ]{8,20}$/', $tel) || mb_strlen($tel) > 20)) {
        return [null, '電話番号の形式が正しくありません。'];
    }
    if ($category !== '' && !isset(CONTACT_CATEGORIES[$category])) {
        return [null, '相談種別が正しくありません。'];
    }

    return [[
        'company' => $company,
        'name' => $name,
        'email' => $email,
        'tel' => $tel,
        'category' => $category === '' ? '' : CONTACT_CATEGORIES[$category],
        'message' => $message,
    ], null];
}

function contact_body(array $data): string
{
    return implode("\n", [
        '株式会社コスギのWebサイトからお問い合わせがありました。',
        '',
        '会社名：' . $data['company'],
        'ご担当者名：' . $data['name'],
        'メールアドレス：' . $data['email'],
        '電話番号：' . ($data['tel'] !== '' ? $data['tel'] : '（未入力）'),
        'ご相談種別：' . ($data['category'] !== '' ? $data['category'] : '（未選択）'),
        '',
        'お問い合わせ内容：',
        $data['message'],
        '',
        '送信日時：' . date('Y-m-d H:i:s'),
    ]);
}

function contact_log(string $dir, string $status, string $to, string $replyTo, string $company, string $detail): void
{
    if (!is_dir($dir)) {
        return;
    }
    $path = $dir . '/mail-log.csv';
    $new = !is_file($path);
    $fp = fopen($path, 'ab');
    if ($fp === false) {
        return;
    }
    if (flock($fp, LOCK_EX)) {
        if ($new) {
            fwrite($fp, "\xEF\xBB\xBF");
            fputcsv($fp, ['datetime', 'status', 'to', 'reply_to', 'company', 'detail']);
        }
        fputcsv($fp, [date('c'), $status, $to, $replyTo, $company, $detail]);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
}

function contact_rate_limited(string $dir, string $ip): bool
{
    $path = $dir . '/rate.json';
    $now = time();
    $data = [];
    if (is_file($path)) {
        $decoded = json_decode((string) file_get_contents($path), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    $key = hash('sha256', $ip);
    $hits = [];
    foreach ($data[$key] ?? [] as $time) {
        if (is_int($time) && $time > $now - 3600) {
            $hits[] = $time;
        }
    }
    if (count($hits) >= 8) {
        $data[$key] = $hits;
        file_put_contents($path, json_encode($data), LOCK_EX);
        return true;
    }
    $hits[] = $now;
    $data[$key] = $hits;
    file_put_contents($path, json_encode($data), LOCK_EX);
    return false;
}

function contact_smtp_read($socket): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $response;
}

function contact_smtp_expect($socket, array $codes): string
{
    $response = contact_smtp_read($socket);
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $codes, true)) {
        throw new RuntimeException('SMTPエラー: ' . trim($response));
    }
    return $response;
}

function contact_smtp_send(array $smtp, string $from, string $to, string $subject, string $body, string $replyTo, string $fromName): void
{
    $host = (string) ($smtp['host'] ?? '');
    $port = (int) ($smtp['port'] ?? 587);
    $secure = (string) ($smtp['secure'] ?? 'tls');
    $user = (string) ($smtp['user'] ?? '');
    $password = (string) ($smtp['password'] ?? '');
    if ($host === '' || $user === '' || $password === '') {
        throw new RuntimeException('SMTPの接続情報が不足しています。');
    }
    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $socket = stream_socket_client($remote, $errno, $error, 15, STREAM_CLIENT_CONNECT);
    if ($socket === false) {
        throw new RuntimeException('SMTPに接続できません。');
    }
    stream_set_timeout($socket, 15);
    contact_smtp_expect($socket, [220]);
    fwrite($socket, "EHLO cosugi-akita.com\r\n");
    contact_smtp_expect($socket, [250]);
    if ($secure === 'tls') {
        fwrite($socket, "STARTTLS\r\n");
        contact_smtp_expect($socket, [220]);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('SMTPの暗号化に失敗しました。');
        }
        fwrite($socket, "EHLO cosugi-akita.com\r\n");
        contact_smtp_expect($socket, [250]);
    }
    fwrite($socket, "AUTH LOGIN\r\n");
    contact_smtp_expect($socket, [334]);
    fwrite($socket, base64_encode($user) . "\r\n");
    contact_smtp_expect($socket, [334]);
    fwrite($socket, base64_encode($password) . "\r\n");
    contact_smtp_expect($socket, [235]);
    fwrite($socket, 'MAIL FROM:<' . $from . ">\r\n");
    contact_smtp_expect($socket, [250]);
    fwrite($socket, 'RCPT TO:<' . $to . ">\r\n");
    contact_smtp_expect($socket, [250, 251]);
    fwrite($socket, "DATA\r\n");
    contact_smtp_expect($socket, [354]);
    $encodedName = mb_encode_mimeheader($fromName, 'UTF-8');
    $encodedSubject = mb_encode_mimeheader($subject, 'UTF-8');
    $headers = [
        'From: ' . $encodedName . ' <' . $from . '>',
        'To: <' . $to . '>',
        'Reply-To: ' . $replyTo,
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    $payload = implode("\r\n", $headers) . "\r\n\r\n" . preg_replace("/\r\n|\r|\n/", "\r\n", $body);
    $payload = preg_replace('/^\./m', '..', $payload);
    fwrite($socket, $payload . "\r\n.\r\n");
    contact_smtp_expect($socket, [250]);
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
}

function contact_deliver(array $config, array $data): array
{
    $to = trim((string) ($config['to'] ?? ''));
    $from = trim((string) ($config['from'] ?? ''));
    if ($to === '' || $from === '' || !contact_email($to) || !contact_email($from)) {
        return [false, 'config', 'メールの宛先が未設定です。'];
    }
    if (!extension_loaded('mbstring')) {
        return [false, 'mbstring', 'mbstring が無効です。'];
    }
    mb_language('uni');
    mb_internal_encoding('UTF-8');
    $subject = '[お問い合わせ] ' . $data['company'];
    $body = contact_body($data);
    $fromName = trim((string) ($config['from_name'] ?? '株式会社コスギ'));
    try {
        $smtp = $config['smtp'] ?? [];
        if (!empty($smtp['enabled'])) {
            contact_smtp_send($smtp, $from, $to, $subject, $body, $data['email'], $fromName);
        } else {
            $headers = implode("\r\n", [
                'MIME-Version: 1.0',
                'Content-Type: text/plain; charset=UTF-8',
                'Content-Transfer-Encoding: 8bit',
                'From: ' . mb_encode_mimeheader($fromName, 'UTF-8') . ' <' . $from . '>',
                'Reply-To: ' . $data['email'],
            ]);
            $ok = mb_send_mail($to, mb_encode_mimeheader($subject, 'UTF-8'), $body, $headers, '-f' . $from);
            if ($ok !== true) {
                return [false, 'mail', 'メール送信に失敗しました。'];
            }
        }
    } catch (Throwable $error) {
        return [false, 'mail', 'メール送信に失敗しました。'];
    }
    return [true, 'sent', ''];
}

function contact_self_test(): array
{
    $errors = [];
    [$data, $error] = contact_validate([
        'company' => "悪\n意",
        'name' => '山田',
        'email' => 'a@example.com',
        'message' => '本文',
        'agree' => true,
    ]);
    if ($data !== null) {
        $errors[] = '改行を含む会社名を拒否できていません';
    }
    [$data, $error] = contact_validate([
        'company' => '秋田商事',
        'name' => '山田',
        'email' => "a@example.com\r\nBcc: x@example.com",
        'message' => '本文',
        'agree' => true,
    ]);
    if ($data !== null) {
        $errors[] = 'メールヘッダーの改行を拒否できていません';
    }
    [$data, $error] = contact_validate([
        'company' => '秋田商事',
        'name' => '山田',
        'email' => 'not-mail',
        'message' => '本文',
        'agree' => true,
    ]);
    if ($error === null) {
        $errors[] = '不正なメールアドレスを拒否できていません';
    }
    [$data, $error] = contact_validate([
        'company' => '秋田商事',
        'name' => '山田太郎',
        'email' => 'taro@example.com',
        'tel' => '018-868-0567',
        'category' => 'work',
        'message' => '作業服の見積もりをお願いします。',
        'agree' => true,
    ]);
    if ($data === null || $data['category'] !== '作業服') {
        $errors[] = '正しい入力を受け付けられていません';
    }
    [$ok] = contact_deliver(['to' => '', 'from' => ''], $data ?? [
        'company' => '秋田商事',
        'name' => '山田',
        'email' => 'taro@example.com',
        'tel' => '',
        'category' => '',
        'message' => '本文',
    ]);
    if ($ok !== false) {
        $errors[] = '未設定の宛先で送信処理が成功しています';
    }
    return $errors;
}
