const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 仮メモリDB
let todos = [
  { id: 1, title: "会議資料の準備" },
  { id: 2, title: "顧客へのメール送信" },
];

// ✅ 一覧ページ
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// ✅ 登録ページ
app.get("/new", (req, res) => {
  res.render("new");
});

// ✅ 新規登録処理
app.post("/todos", (req, res) => {
  const newTitle = req.body.title?.trim();
  if (newTitle && newTitle.length > 0) {
    const newTodo = {
      id: todos.length + 1,
      title: newTitle,
    };
    todos.push(newTodo);
  }
  res.redirect("/");
});

// 🔜 他ページ（今後実装予定）
app.get("/edit", (req, res) => res.render("edit"));
app.get("/delete", (req, res) => res.render("delete"));

// Cloud Run 対応
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 mabl ToDo app running at http://localhost:${PORT}`);
});