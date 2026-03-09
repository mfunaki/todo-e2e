# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

mablを使用したE2Eテストの対象となるToDoアプリケーション。Node.js + Express.js + EJSで構築され、Google Cloud Runにデプロイされる。

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# アプリケーションの起動（ポート8080）
npm start

# Docker実行
docker build -t todo-e2e .
docker run -p 8080:8080 todo-e2e
```

## Playwrightテスト

```bash
# Playwrightのセットアップ
npm install -D @playwright/test
npx playwright install

# テスト実行
npx playwright test                           # 全テスト
npx playwright test tests/todo-e2e.spec.ts    # 特定テスト
npx playwright test --ui                      # UIモード
npx playwright test --debug                   # デバッグモード
```

推奨 `playwright.config.ts` 設定:
```ts
export default {
  testDir: './tests',
  use: {
    baseURL: process.env.URL || 'https://todo-e2e-852080299306.asia-northeast1.run.app',
  },
};
```

## アーキテクチャ

```
app.js          - Expressサーバーとルーティング定義
views/          - EJSテンプレート（index, new, edit, delete）
tests/          - mablからエクスポートされたPlaywrightテスト
.github/workflows/deploy-and-test.yml - CI/CD（Cloud Runデプロイ + mablテスト）
```

### ルーティング
- `/` - ToDo一覧ページ
- `/new` - 新規登録ページ
- `/edit` - 更新ページ
- `/delete` - 削除ページ

### ビュー（views/*.ejs）

すべて Bootstrap 5 CDN を利用した静的テンプレート（未実装プレースホルダ）。

- `views/index.ejs` - タイトル「ToDo一覧ページ（未実装）」。`/new`, `/edit`, `/delete` へのナビゲーションボタンあり。
- `views/new.ejs` - タイトル「ToDo登録ページ（未実装）」。`/` への戻りリンクあり。
- `views/edit.ejs` - タイトル「ToDo更新ページ（未実装）」。`/` への戻りリンクあり。
- `views/delete.ejs` - タイトル「ToDo削除ページ（未実装）」。`/` への戻りリンクあり。

mablテストでの検証対象: ページ遷移（リンククリック）、タイトルやテキスト内容、ボタン表示。

## 環境変数

- `PORT` - アプリケーションポート（デフォルト: 8080）
- `URL` - テスト対象URL（Playwrightテスト用）
- `USERNAME`, `PASSWORD` - 認証が必要な場合のテスト用ユーザー名・パスワード

## CI/CD

GitHub Actionsで以下を自動実行：
1. Cloud Runへのデプロイ
2. mablによるE2Eテスト実行

必要なSecrets: `GCP_PROJECT_ID`, `GCP_SA_KEY`, `MABL_API_KEY`
必要なVariables: `MABL_APPLICATION_ID`, `MABL_ENVIRONMENT_ID`, `MABL_PLAN_LABELS`
