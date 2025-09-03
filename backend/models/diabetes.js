import mongoose from "mongoose";

const diabetesSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  sex: { type: Number, required: true },
  bmi: { type: Number, required: true },
  bp: { type: Number, required: true },
  s1: { type: Number, required: true },
  s2: { type: Number, required: true },
  s3: { type: Number, required: true },
  s4: { type: Number, required: true },
  s5: { type: Number, required: true },
  s6: { type: Number, required: true },
  target: { type: Number, required: true },
  outcome: { type: Number, enum: [0, 1], required: true }

}, { timestamps: true });

export default mongoose.model("Diabetes", diabetesSchema);