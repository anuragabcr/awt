import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mysql from "mysql";
const __dirname = path.resolve();

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL",
  database: "world",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/db_FE.html");
});

app.get("/employees", (req, res) => {
  const sql = `SELECT * FROM employees`;

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.error("Error retrieving employee record: ", err);
      res.sendStatus(500);
    } else {
      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json(results);
      }
    }
  });
});

app.post("/employees", (req, res) => {
  const { emp_id, name, salary } = req.body;

  const employee = {
    emp_id,
    name,
    salary,
  };

  connection.query(
    "INSERT INTO employees SET ?",
    employee,
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting employee record: ", error);
        res.sendStatus(500);
      } else {
        console.log("Employee record inserted successfully");
        res.sendStatus(200);
      }
    }
  );
});

app.get("/employees/:emp_id", (req, res) => {
  const { emp_id } = req.params;

  const sql = `SELECT * FROM employees WHERE emp_id = ?`;
  const values = [emp_id];

  connection.query(sql, values, (err, results, fields) => {
    if (err) {
      console.error("Error retrieving employee record: ", err);
      res.sendStatus(500);
    } else {
      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        const employee = results[0];
        res.status(200).json(employee);
      }
    }
  });
});

app.delete("/employees/:emp_id", (req, res) => {
  const { emp_id } = req.params;

  connection.query(
    "DELETE FROM employees WHERE emp_id = ?",
    emp_id,
    (error, results, fields) => {
      if (error) {
        console.error("Error deleting employee record: ", error);
        res.sendStatus(500);
      } else {
        console.log(
          `Employee record with emp_id ${emp_id} deleted successfully`
        );
        res.sendStatus(200);
      }
    }
  );
});

app.put("/employees/:emp_id", (req, res) => {
  const { emp_id } = req.params;
  const { name, salary } = req.body;

  const sql = `UPDATE employees SET name=?, salary=? WHERE emp_id=?`;
  const values = [name, salary, emp_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating employee record: ", err);
      res.sendStatus(500);
    } else {
      console.log(`Updated employee record with emp_id ${emp_id}`);
      res.sendStatus(200);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
