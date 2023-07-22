export interface DiagnosesType {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientsType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientDetails = Omit<PatientsType, "ssn">;
