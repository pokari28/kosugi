# FTP公開データの再生成

公開先は `https://cosugi-akita.com/` です。サーバーでは Node.js を使いません。制作者の作業用パソコンで次を実行し、できた ZIP を納品します。

```bash
npm install
npm run build:ftp
```

成果物は `artifacts/cosugi-akita-ftp.zip` です。解凍した直下に `index.html` と `contact-send.php` があります。

GitHub Pages 用の `npm run build:pages` とは別に実行します。Pages 用ビルドでは問い合わせメールの送信先を埋め込みません。

差し替えアップロードのとき、サーバー上の `private/contact-config.php` は上書きしないでください。受信メールアドレスが消えます。
