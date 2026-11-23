<?php
/**
 * お問い合わせメール設定
 *
 * 公開前に、サーバー管理会社がこのファイルだけを編集する。
 * to と from が空のあいだはメールを送らず、画面も「送信完了」にしない。
 * 仮のアドレスは記入しない。
 *
 * to        受信するメールアドレス
 * from      送信元。必ず cosugi-akita.com のメールアドレスにする
 * from_name 送信者名
 * hosts     フォームを受け付けるサイトのホスト名
 * smtp      サーバーがSMTP認証を求めるときだけ enabled を true にする
 */
return [
    'to' => '',
    'from' => '',
    'from_name' => '株式会社コスギ',
    'hosts' => ['cosugi-akita.com', 'www.cosugi-akita.com'],
    'smtp' => [
        'enabled' => false,
        'host' => '',
        'port' => 587,
        'secure' => 'tls',
        'user' => '',
        'password' => '',
    ],
];
