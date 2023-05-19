const sql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
// const errors = require("formidable/formidableerror");
const app = express();
app.use(bodyParser.json());

const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL",
  database: "world",
});
con.connect((err) => {
  if (err) {
    console.log("Error in connection", err);
  } else {
    console.log("Connected to MySQL");
  }
});
app.get("/", (req, res) => {
  res.send("Hi this is Dreamy");
});

app.post("/p", (req, res) => {
  const { name, roll_no, course } = req.body;
  const stu = {
    name,
    roll_no,
    course,
  };
  con.query("INSERT INTO DREAMG SET ?", stu, (error, results, fields) => {
    if (error) {
      console.log("There is an error in inserting data", error);
      res.sendStatus(500);
    } else {
      console.log("Inserted succesfully");
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
