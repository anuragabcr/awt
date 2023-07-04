import express from "express";
import cors from "cors";
import path from "path";
import mysql from "mysql";
const __dirname = path.resolve();

const app = express();
app.use(cors());

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

app.get("/students", (req, res) => {
  const query = "SELECT * FROM students";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
