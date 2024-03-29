import patientData from "../data/patients";
import { NewPatient, PatientDetails, PatientsType } from "../types/types";
import { v1 as uuidv1 } from "uuid";

const getPatientData = (): PatientDetails[] => {
  return patientData;
};

const getPatientDataById = (id: string): PatientsType | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (newPatientData: NewPatient): PatientsType => {
  const newPatient = {
    id: uuidv1(),
    ...newPatientData,
  };

  patientData.push(newPatient);

  return newPatient;
};

export { getPatientData, addPatient, getPatientDataById };
