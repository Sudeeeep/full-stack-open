import patientData from "../data/patients";
import { PatientDetails } from "../types/types";

const getPatientData = (): PatientDetails[] => {
  return patientData;
};

export { getPatientData };
