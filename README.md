# 株式会社コスギ 公式サイト

公開URL（GitHub Pages）:

**https://pokari28.github.io/bamboo-fair-bloom-crane/**

`main` ブランチに更新が上がると、GitHub Actions が自動でビルドして公開します。

## 初回だけ必要な設定

1. リポジトリを **Public** にする（無料プランで Pages を公開するため）
   - Settings → General → 一番下の Danger Zone → Change visibility → Public
2. Pages の公開方法を Actions にする
   - Settings → Pages → Source を **GitHub Actions** にする
3. Actions タブで **Deploy to GitHub Pages** が成功しているか確認する

## ローカルで確認

```
npm install
npm run dev
```

ブラウザで http://localhost:8080 を開きます。
