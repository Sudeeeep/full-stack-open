import diagnoses from "../data/diagnoses";
import { DiagnosesType } from "../types/types";

const getDiagnoses = (): DiagnosesType[] => {
  return diagnoses;
};

export { getDiagnoses };
