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

## 環境変数

- `PORT` - アプリケーションポート（デフォルト: 8080）
- `URL` - テスト対象URL（Playwrightテスト用）

## CI/CD

GitHub Actionsで以下を自動実行：
1. Cloud Runへのデプロイ
2. mablによるE2Eテスト実行

必要なSecrets: `GCP_PROJECT_ID`, `GCP_SA_KEY`, `MABL_API_KEY`
必要なVariables: `MABL_APPLICATION_ID`, `MABL_ENVIRONMENT_ID`, `MABL_PLAN_LABELS`
