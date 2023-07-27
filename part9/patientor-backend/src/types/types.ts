export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

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
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<PatientsType, "id">;

export type PatientDetails = Omit<PatientsType, "ssn">;
