# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## プロジェクト概要

`todo-e2e` は、mabl を使った E2E テストの対象となるシンプルな ToDo Web アプリケーションです。

- UI 自体はほぼ「未実装」状態の画面テンプレートで構成されており、ページ遷移や画面構造をテストするのが主目的です。
- Node.js + Express + EJS で構築され、単一コンテナとして Google Cloud Run にデプロイすることを想定しています。
- `tests/` 以下には、mabl からエクスポートされた Playwright テストが含まれます。

## 開発・実行コマンド

### 依存関係のインストール

- ルートで実行:
  - `npm install`

Node.js 18 以上が前提です（`package.json` の `engines.node` 参照）。

### アプリケーションの起動

- 通常起動（Cloud Run を含む本番相当）
  - `npm start`
- 開発モード（現状 `start` と同じ挙動）
  - `npm run dev`

デフォルトでは `PORT` 環境変数がなければ `8080` でリッスンします:
- ローカルアクセス: `http://localhost:8080`

### Docker 実行

- イメージビルド:
  - `docker build -t todo-e2e .`
- コンテナ起動:
  - `docker run -p 8080:8080 todo-e2e`

`Dockerfile` は Node 20 Alpine ベースで、`npm install --production` → `npm start` のシンプルな構成です。Cloud Run では `PORT` が自動設定されます。

### Playwright テスト（mabl エクスポート）

このリポジトリには、mabl からエクスポートされた Playwright テストスイートが `tests/` に含まれています。Playwright 用の依存関係・設定は自分で追加する前提です。

1. Playwright のセットアップ（ルートまたは専用パッケージで実施）:
   - `npm install -D @playwright/test`
   - `npx playwright install`

2. テスト実行例:
   - 全テスト: `npx playwright test`
   - 特定テストファイル: `npx playwright test tests/todo-e2e.spec.ts`
   - UI モード: `npx playwright test --ui`
   - デバッグモード: `npx playwright test --debug`

3. 推奨 `playwright.config.ts`（例）:
   - `testDir: './tests'`
   - `use.baseURL: process.env.URL || 'https://todo-e2e-852080299306.asia-northeast1.run.app'`

テストで使用する環境変数の例:
- `URL`: テスト対象アプリのベース URL
- `USERNAME`, `PASSWORD`: 認証が必要な場合のテスト用ユーザー名・パスワード

## アプリケーション構成とルーティング

### エントリーポイント: `app.js`

- Express アプリケーションを生成し、EJS をビューエンジンとして設定しています。
  - `app.set('view engine', 'ejs');`
  - `app.use(express.static('public'));` で静的ファイルを `public/` から配信（`public` ディレクトリは必要に応じて追加）。
- ルーティング:
  - `GET /` → `views/index.ejs`
  - `GET /new` → `views/new.ejs`
  - `GET /edit` → `views/edit.ejs`
  - `GET /delete` → `views/delete.ejs`
- ポート:
  - `PORT` 環境変数があればそれを使用、なければ `8080` を使用。

この構成にビジネスロジックや DB はなく、各ページは「未実装プレースホルダ」として画面構造とナビゲーションのみを提供します。

### ビュー: `views/*.ejs`

すべて Bootstrap 5 の CDN を利用した静的なテンプレートです。

- `views/index.ejs`
  - タイトル: 「ToDo一覧ページ（未実装）」
  - 説明文: 将来的に ToDo リストと登録・更新・削除ボタンが追加される旨を表示。
  - ナビゲーションボタン:
    - `/new`（新規登録ページ）
    - `/edit`（更新ページ）
    - `/delete`（削除ページ）

- `views/new.ejs`
  - タイトル: 「ToDo登録ページ（未実装）」
  - 説明文: 将来的に登録フォームが実装される旨を表示。
  - `/` への戻りリンクあり。

- `views/edit.ejs`
  - タイトル: 「ToDo更新ページ（未実装）」
  - 説明文: 既存 ToDo 編集機能が今後追加されることを示すプレースホルダ。
  - `/` への戻りリンクあり。

- `views/delete.ejs`
  - タイトル: 「ToDo削除ページ（未実装）」
  - 説明文: ToDo 削除確認画面が今後追加される予定であることを説明。
  - `/` への戻りリンクあり。

画面としては非常に単純ですが、mabl／Playwright テストの観点では:
- ページ遷移（リンククリック）
- タイトルやテキスト内容
- ボタン表示
などを検証対象とすることができます。

## CI/CD と mabl 連携の前提

このリポジトリは GitHub Actions を用いた Cloud Run デプロイと mabl テスト実行を前提としています（ワークフロー定義は `.github/workflows` 配下を参照）。

README/CLAUDE の前提となる Secrets/Variables:

- **Google Cloud 関連 (Secrets)**
  - `GCP_PROJECT_ID`: GCP プロジェクト ID
  - `GCP_SA_KEY`: サービスアカウント JSON キー
- **mabl 関連 (Secrets/Variables)**
  - Secrets:
    - `MABL_API_KEY`: mabl API キー
  - Variables（または Secrets として管理する場合もあり）:
    - `MABL_APPLICATION_ID`
    - `MABL_ENVIRONMENT_ID`
    - `MABL_PLAN_LABELS`（例: `"smoke-tests"`）

Cloud Run デプロイ後、mabl で設定したアプリケーション／環境／プランに対して GitHub Actions からテストを実行する想定です。

## 環境変数のまとめ

アプリ本体とテストで利用される主な環境変数は次の通りです。

- アプリケーション（`app.js`）
  - `PORT`: Express サーバーのリッスンポート（デフォルト: `8080`）
- Playwright テスト（`tests` ディレクトリの README 想定）
  - `URL`: テスト対象のアプリケーション URL（Cloud Run の URL など）
  - `USERNAME`, `PASSWORD`: 必要に応じて認証情報を外出しする場合に使用

テストを本番／ステージング環境に向けて実行する際は、`URL` を変更したうえで `npx playwright test` を実行してください。