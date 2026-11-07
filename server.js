const express = require("express");
const cors = require("cors");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("skills.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) AS n FROM skills").get().n;
if (count === 0) {
  const insert = db.prepare("INSERT INTO skills (name) VALUES (?)");
  ["HTML", "CSS", "JavaScript"].forEach((s) => insert.run(s));
}

function allSkills() {
  return db
    .prepare("SELECT name FROM skills ORDER BY id")
    .all()
    .map((row) => row.name);
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/skills", (req, res) => {
  res.json(allSkills());
});

app.post("/api/skills", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  db.prepare("INSERT OR IGNORE INTO skills (name) VALUES (?)").run(name);
  res.status(201).json(allSkills());
});

app.delete("/api/skills/:name", (req, res) => {
  db.prepare("DELETE FROM skills WHERE name = ?").run(req.params.name);
  res.json(allSkills());
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});