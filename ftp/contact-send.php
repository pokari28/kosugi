<?php
declare(strict_types=1);

$configPath = __DIR__ . '/private/contact-config.php';
$libPath = __DIR__ . '/private/contact-lib.php';
if (!is_file($configPath) || !is_file($libPath)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['ok' => false, 'error' => '送信設定が見つかりません。'], JSON_UNESCAPED_UNICODE);
    exit;
}
$config = require $configPath;
require_once $libPath;

function contact_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function contact_host_allowed(array $config): bool
{
    $source = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
    if ($source === '') {
        $source = trim((string) ($_SERVER['HTTP_REFERER'] ?? ''));
    }
    if ($source === '') {
        return false;
    }
    $host = parse_url($source, PHP_URL_HOST);
    $allowed = array_map('strtolower', $config['hosts'] ?? []);
    return is_string($host) && in_array(strtolower($host), $allowed, true);
}

if (PHP_SAPI !== 'cli') {
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $https,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf'] = $token;
    $_SESSION['csrf_at'] = time();
    contact_json(200, ['ok' => true, 'token' => $token]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    contact_json(405, ['ok' => false, 'error' => '送信方法が正しくありません。']);
}

if (!contact_host_allowed($config)) {
    contact_json(403, ['ok' => false, 'error' => '送信元を確認できませんでした。']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    contact_json(400, ['ok' => false, 'error' => '送信内容が不正です。']);
}
$input = json_decode($raw, true);
if (!is_array($input)) {
    contact_json(400, ['ok' => false, 'error' => '送信内容が不正です。']);
}

$token = (string) ($input['token'] ?? '');
$saved = (string) ($_SESSION['csrf'] ?? '');
$issued = (int) ($_SESSION['csrf_at'] ?? 0);
unset($_SESSION['csrf'], $_SESSION['csrf_at']);
$age = time() - $issued;
if ($saved === '' || $issued === 0 || $age < 2 || $age > 7200 || !hash_equals($saved, $token)) {
    contact_json(403, ['ok' => false, 'error' => 'ページを再読み込みして、もう一度送信してください。']);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
if (contact_rate_limited(__DIR__ . '/private', $ip)) {
    contact_json(429, ['ok' => false, 'error' => '送信が集中しています。時間をおいて再度お試しください。']);
}

[$data, $error] = contact_validate($input);
if ($data === null) {
    contact_log(__DIR__ . '/private', 'rejected', '', (string) ($input['email'] ?? ''), (string) ($input['company'] ?? ''), (string) $error);
    contact_json(400, ['ok' => false, 'error' => $error]);
}

[$ok, $code, $detail] = contact_deliver($config, $data);
if (!$ok) {
    $public = $code === 'config'
        ? '現在、メールの受信設定が完了していないため送信できません。お電話にてご連絡ください。'
        : '送信に失敗しました。時間をおいて再度お試しいただくか、お電話にてご連絡ください。';
    contact_log(__DIR__ . '/private', 'failed', (string) ($config['to'] ?? ''), $data['email'], $data['company'], $code . ' ' . $detail);
    contact_json(500, ['ok' => false, 'error' => $public]);
}

contact_log(__DIR__ . '/private', 'sent', (string) $config['to'], $data['email'], $data['company'], 'sent');
contact_json(200, ['ok' => true]);
