import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  emp_id: { type: String },
  name: { type: String },
  salary: { type: String },
});

export const EmployeeDB = mongoose.model("Employee", employeeSchema);

const testSchema = new mongoose.Schema({
  name: { type: String },
});

export const TestDB = mongoose.model("Test", testSchema);

const fileSchema = new mongoose.Schema({
  name: String,
  file: Buffer,
});

export const FileDB = mongoose.model("File", fileSchema);
