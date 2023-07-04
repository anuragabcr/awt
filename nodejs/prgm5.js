import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mysql from "mysql";
const __dirname = path.resolve();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL",
  database: "world",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/prgm5.html");
});

app.post("/register", (req, res) => {
  const { name, roll, course, email, phone } = req.body;

  const query = `INSERT INTO students (name, roll, course, email, phone) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [name, roll, course, email, phone], (err, result) => {
    if (err) throw err;
    console.log("Student registered successfully");
    res.send("Student registered successfully");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
