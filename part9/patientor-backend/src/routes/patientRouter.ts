import express from "express";
import { addPatient, getPatientData } from "../services/patientService";
import toNewPatient from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(getPatientData());
});

patientRouter.post("/", (req, res) => {
  const newPatientToAdd = toNewPatient(req.body);

  const addedPatient = addPatient(newPatientToAdd);
  res.json(addedPatient);
});

export default patientRouter;
