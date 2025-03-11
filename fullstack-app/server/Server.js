const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/medicalRecords", { useNewUrlParser: true, useUnifiedTopology: true });

const RecordSchema = new mongoose.Schema({ cid: String });
const Record = mongoose.model("Record", RecordSchema);

app.post("/api/records/upload", async (req, res) => {
  try {
    const { cid } = req.body;
    if (!cid) return res.status(400).json({ message: "CID is required" });

    const newRecord = new Record({ cid });
    await newRecord.save();

    res.status(201).json({ message: "CID stored successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
