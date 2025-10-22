const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// ミドルウェアの設定
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// インメモリでToDoを管理（本番環境ではデータベースを使用すべき）
let todos = [
  { id: 1, title: "サンプルToDo1", description: "これはサンプルです", completed: false },
  { id: 2, title: "サンプルToDo2", description: "完了済みのタスク", completed: true },
];
let nextId = 3;

// ルート: ToDo一覧
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// ルート: 新規登録フォーム
app.get("/new", (req, res) => {
  res.render("new");
});

// ルート: 新規登録処理
app.post("/create", (req, res) => {
  const { title, description } = req.body;
  if (title) {
    todos.push({
      id: nextId++,
      title,
      description: description || "",
      completed: false,
    });
  }
  res.redirect("/");
});

// ルート: 編集フォーム
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    res.render("edit", { todo });
  } else {
    res.redirect("/");
  }
});

// ルート: 更新処理
app.post("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed === "on";
  }
  res.redirect("/");
});

// ルート: 削除確認ページ
app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    res.render("delete", { todo });
  } else {
    res.redirect("/");
  }
});

// ルート: 削除処理
app.post("/destroy/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.redirect("/");
});

// ルート: 完了状態のトグル（AJAX用）
app.post("/toggle/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    res.json({ success: true, completed: todo.completed });
  } else {
    res.status(404).json({ success: false, message: "ToDo not found" });
  }
});

// Cloud RunではPORT環境変数を使用
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
