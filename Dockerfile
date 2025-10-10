# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係をコピー・インストール
COPY package*.json ./
RUN npm install --production

# ソースコードをコピー
COPY . .

# Cloud Runでは環境変数 PORT が自動設定される
ENV PORT=8080
EXPOSE 8080

# アプリ起動
CMD ["npm", "start"]