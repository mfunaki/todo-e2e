# ToDo E2E Tests - Playwright Export

mablからエクスポートしたPlaywrightテストです。

## エクスポートされたテスト

### 1. ToDo-E2E - AIアサーション - 各ページの要件
- トップページ、新規登録、更新、削除の各ページを巡回
- GenAI アサーションは手動で実装が必要

### 2. 1010 - ToDo - アイテム登録、一覧確認  
- ToDoアイテムを登録して一覧に表示されることを確認

### 3. 1010 ToDo - 各画面の実装状況
- すべての画面の実装状況を確認

## セットアップ

```bash
# Playwrightをインストール
npm install -D @playwright/test

# ブラウザをインストール
npx playwright install
```

## 実行方法

```bash
# すべてのテストを実行
npx playwright test

# 特定のテストを実行
npx playwright test tests/todo-e2e.spec.ts

# UIモードで実行
npx playwright test --ui

# デバッグモード
npx playwright test --debug
```

## 注意事項

### GenAI アサーション
mablのGenAI アサーション機能はPlaywrightエクスポートでサポートされていません。以下のコメント部分は手動で実装が必要です:

```typescript
// GenAI Assert: ToDo一覧ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
// [AssertAIPrompt] step with find type [viewport is not supported for Playwright export
```

### URL設定
テストは `todo-skelton` というURLを使用していますが、実際のアプリケーションURLは:
- 現在のアプリ: `https://todo-e2e-852080299306.asia-northeast1.run.app`

必要に応じて環境変数で設定してください:

```bash
export URL=https://todo-e2e-852080299306.asia-northeast1.run.app
```

### 環境変数
テストで使用される環境変数（必要に応じて設定）:
- `USERNAME` - 認証ユーザー名
- `PASSWORD` - 認証パスワード

## Playwright設定ファイル

`playwright.config.ts` を作成することを推奨:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.URL || 'https://todo-e2e-852080299306.asia-northeast1.run.app',
    trace: 'on-first-retry',
  },
});
```
