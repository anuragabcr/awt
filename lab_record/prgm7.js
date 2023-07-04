const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://anuragabcr:X2UoSBCCVwuBhckY@cluster1.rtieqps.mongodb.net/Anurag?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Error connecting to the database:", error));

const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  email: String,
  phone: String,
  semester: String,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/students", (req, res) => {
  Student.find({ semester: "MCA 2", course: "AWT" })
    .then((students) => res.json(students))
    .catch((error) =>
      res.status(500).json({
        error: "An error occurred while fetching data from the database",
      })
    );
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/prgm7.html");
});

app.get("/insert", (req, res) => {
  const newStudent = new Student({
    name: "student2",
    roll: "72",
    email: "s22tudent@gamil.com",
    phone: "176227866562",
    semester: "MCA 2",
    course: "AWT",
  });
  newStudent.save();
  res.json({ msg: "inserted successful" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
