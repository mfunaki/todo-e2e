# ToDo E2E Testing Application

このプロジェクトは、mablを使用したE2Eテストの対象となるToDoアプリケーションです。

## 機能

- ToDo一覧表示
- 新規ToDo登録
- 編集・削除機能（今後実装予定）

## 技術スタック

- Node.js + Express.js
- EJS テンプレートエンジン
- Bootstrap 5
- Docker
- Google Cloud Run

## GitHub Actions CI/CD セットアップ

このプロジェクトは、GitHub Actionsを使用して自動デプロイとテストを実行します。

### 必要なSecrets設定

GitHubリポジトリのSettings > Secrets and variables > Actionsで以下のSecretsを設定してください：

#### Google Cloud関連
- `GCP_PROJECT_ID`: Google Cloud プロジェクトID
- `GCP_SA_KEY`: Google Cloud サービスアカウントのJSONキー

#### mabl関連
- `MABL_APPLICATION_KEY`: mablのアプリケーションキー

### サービスアカウントの権限

Google Cloudサービスアカウントには以下の権限が必要です：

```bash
# 必要なロール
- Cloud Run Admin
- Storage Admin (Container Registry用)
- Service Account User
```

### ワークフローの動作

1. **ブランチへのプッシュ時**: `develop`, `feature/*`, `hotfix/*`ブランチへのプッシュでトリガー
2. **プルリクエスト時**: `main`ブランチへのPRでトリガー
3. **デプロイ**: Google Cloud RunにDockerイメージをデプロイ
4. **テスト実行**: mablを使用してE2Eテストを実行
5. **自動マージ**: テスト成功時に`main`ブランチに自動マージ（プッシュ時のみ）

### mablテストの設定

現在のワークフローでは、mablテストの実行部分がコメントアウトされています。
実際のmablの設定に応じて、以下の部分を調整してください：

```yaml
# mabl test run \
#   --application-key $MABL_APPLICATION_KEY \
#   --environment-url $SERVICE_URL \
#   --wait-for-completion
```

## ローカル開発

```bash
# 依存関係のインストール
npm install

# アプリケーションの起動
npm start

# 開発モード
npm run dev
```

## Docker実行

```bash
# イメージのビルド
docker build -t todo-e2e .

# コンテナの実行
docker run -p 8080:8080 todo-e2e
```

## 環境変数

- `PORT`: アプリケーションのポート番号（デフォルト: 8080）
