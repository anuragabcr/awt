import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
const __dirname = path.resolve();

const app = express();

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://anuragabcr:X2UoSBCCVwuBhckY@cluster1.rtieqps.mongodb.net/Anurag?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

const employeeSchema = new mongoose.Schema({
  emp_id: { type: String },
  name: { type: String },
  salary: { type: String },
});

const EmployeeDB = mongoose.model("Employee", employeeSchema);

connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/db_FE.html");
});

app.get("/employees", async (req, res) => {
  const results = await EmployeeDB.find();
  if (results.length === 0) {
    res.sendStatus(404);
  } else {
    res.status(200).json(results);
  }
});

app.post("/employees", async (req, res) => {
  const { emp_id, name, salary } = req.body;

  const employee = {
    emp_id,
    name,
    salary,
  };
  const result = await EmployeeDB.create(employee);
  console.log("Employee record inserted successfully");
  res.sendStatus(200);
});

app.get("/employees/:emp_id", async (req, res) => {
  const { emp_id } = req.params;
  const result = await EmployeeDB.findOne({ emp_id });
  const employee = results[0];
  res.status(200).json(employee);
});

app.delete("/employees/:emp_id", async (req, res) => {
  const { emp_id } = req.params;
  const result = await EmployeeDB.deleteOne({ emp_id });
  console.log(`Employee record with emp_id ${emp_id} deleted successfully`);
  res.sendStatus(200);
});

app.put("/employees/:emp_id", async (req, res) => {
  const { emp_id } = req.params;
  const { name, salary } = req.body;
  const result = await EmployeeDB.updateOne({ emp_id }, { name, salary });
  console.log(`Updated employee record with emp_id ${emp_id}`);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
