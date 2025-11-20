import path from "path";
import { spawn } from "child_process";
import Diabetes from "../models/diabetes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictDiabetes = async (req, res) => {
  try {
    const data = req.body;

    const pythonScript = path.join(__dirname, "..", "..", "ml", "predict.py");
    const payload = JSON.stringify(data);

    const py = spawn("python", [pythonScript, payload]);

    let resultData = "";
    let errorData = "";

    py.stdout.on("data", (d) => (resultData += d.toString()));
    py.stderr.on("data", (d) => (errorData += d.toString()));

    py.on("close", async () => {
      if (errorData) {
        console.log("PYTHON ERROR:", errorData);
        return res.status(500).json({ error: errorData });
      }

      const parsed = JSON.parse(resultData);

      
      const record = new Diabetes({
        ...data,
        prediction: parsed.prediction,
        probability: parsed.probability,
      });

      await record.save();

      res.json(parsed);
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserRecords = async (req, res) => {
  try {
    const records = await Diabetes.find({ user: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const record = await Diabetes.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!record) return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
