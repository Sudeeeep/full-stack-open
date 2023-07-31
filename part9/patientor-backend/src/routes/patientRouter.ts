import express from "express";
import {
  addPatient,
  getPatientData,
  getPatientDataById,
} from "../services/patientService";
import toNewPatient from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(getPatientData());
});

patientRouter.get("/:id", (req, res) => {
  const patient = getPatientDataById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post("/", (req, res) => {
  const newPatientToAdd = toNewPatient(req.body);

  const addedPatient = addPatient(newPatientToAdd);
  res.json(addedPatient);
});

export default patientRouter;
