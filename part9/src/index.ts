import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import bodyParser from "body-parser";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(bodyParser.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  if (!body) {
    res.status(400).json({
      error: "parameters missing",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] = body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = body.target;

  if (isNaN(target) || daily_exercises.some((hours) => isNaN(hours))) {
    res.status(400).json({
      error: "malformatted parameter",
    });
  } else if (target > 24 || daily_exercises.some((hours) => hours > 24)) {
    res.status(400).json({
      error: "daily hour should not exceed 24",
    });
  } else {
    const result = exerciseCalculator(daily_exercises, target);
    res.json(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
