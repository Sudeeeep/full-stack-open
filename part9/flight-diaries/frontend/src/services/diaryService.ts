import axios from "axios";
import { DiaryEntry, NewEntry } from "../types";

const baseUrl = "http://localhost:3001";

export const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`);
  console.log(response);
  return response.data;
};

export const addDiary = async (diary: NewEntry) => {
  console.log(diary);
  try {
    const response = await axios.post(`${baseUrl}/api/diaries`, diary);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
