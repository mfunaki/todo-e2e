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
- `MABL_API_KEY`: mablのAPIキー（CI/CD integration用）
- `MABL_APPLICATION_ID`: mablのアプリケーションID
- `MABL_ENVIRONMENT_ID`: mablの環境ID
- `MABL_PLAN_LABELS`: 実行するテストプランのラベル

### Google Cloud セットアップ

#### 1. 必要なAPIの有効化
プロジェクトオーナー権限でGoogle Cloud Consoleにアクセスし、以下のAPIを有効化してください：

- **Cloud Resource Manager API**
- **Cloud Run API**
- **Artifact Registry API**
- **Container Registry API**

#### 2. Artifact Registryリポジトリの作成
```bash
gcloud artifacts repositories create todo-e2e-repo \
    --repository-format=docker \
    --location=asia-northeast1 \
    --description="Docker repository for todo-e2e app"
```

#### 3. サービスアカウントの権限

Google Cloudサービスアカウントには以下の権限が必要です：

```bash
# 必要なロール
- Cloud Run Admin (roles/run.admin)
- Service Account User (roles/iam.serviceAccountUser)
- Artifact Registry Writer (roles/artifactregistry.writer)
```

### ワークフローの動作

1. **ブランチへのプッシュ時**: `develop`, `feature/*`, `hotfix/*`ブランチへのプッシュでトリガー
2. **プルリクエスト時**: `main`ブランチへのPRでトリガー
3. **デプロイ**: Google Cloud RunにDockerイメージをデプロイ
4. **テスト実行**: mablを使用してE2Eテストを実行
5. **自動マージ**: テスト成功時に`main`ブランチに自動マージ（プッシュ時のみ）

### mablテストの設定

このワークフローでは、mabl公式のGitHub Actionを使用してテストを実行します。

#### mablでの設定手順
1. **APIキーの作成**: mablワークスペースで「CI/CD integration」用のAPIキーを作成
2. **アプリケーションの設定**: テスト対象のアプリケーションをmablで設定
3. **環境の設定**: テスト環境（デプロイされたサービスのURL）を設定
4. **テストプランの作成**: 実行したいテストプランを作成し、ラベルを設定

#### GitHub Secretsの設定
以下のSecretsをGitHubリポジトリに設定してください：
- `MABL_API_KEY`: mablで作成したAPIキー
- `MABL_APPLICATION_ID`: mablのアプリケーションID
- `MABL_ENVIRONMENT_ID`: mablの環境ID  
- `MABL_PLAN_LABELS`: 実行するテストプランのラベル（例: "smoke-tests"）

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
