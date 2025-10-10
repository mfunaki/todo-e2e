const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// 各ページ
app.get("/", (req, res) => res.render("index"));
app.get("/new", (req, res) => res.render("new"));
app.get("/edit", (req, res) => res.render("edit"));
app.get("/delete", (req, res) => res.render("delete"));

// Cloud RunではPORT環境変数を使用
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});