import express from "express";
const app = express();
import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

import path from "path";
const __dirname = path.resolve();

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.send(400).send("No file uploaded");
  } else {
    res.send("File sucrssfully uploaded");
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});

app.listen(3000, (req, res) => {
  console.log("Local Server 3000 started");
});
