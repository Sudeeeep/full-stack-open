import express from "express";
import { getPatientData } from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(getPatientData());
});

export default patientRouter;
