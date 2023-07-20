import express from "express";
import { bmiCalculator } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello fullstack");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    const bmi = bmiCalculator(height, weight);
    res.json({
      weight,
      height,
      bmi,
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
