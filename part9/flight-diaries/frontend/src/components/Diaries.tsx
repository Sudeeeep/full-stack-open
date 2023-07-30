import { DiaryEntry } from "../types";

export const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map((diary, index) => (
        <div key={index}>
          <h3>{diary.date}</h3>
          <div>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
