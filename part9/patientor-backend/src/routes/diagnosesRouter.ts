import express from "express";
import { getDiagnoses } from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(getDiagnoses());
});

export default diagnosesRouter;
