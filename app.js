const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// 一覧ページ
app.get("/", (req, res) => {
  res.render("index");
});

// 登録ページ
app.get("/new", (req, res) => {
  res.render("new");
});

// 更新ページ
app.get("/edit", (req, res) => {
  res.render("edit");
});

// 削除ページ
app.get("/delete", (req, res) => {
  res.render("delete");
});

// サーバ起動
app.listen(3000, () => {
  console.log("🚀 mabl ToDo Skeleton running at http://localhost:3000");
});
