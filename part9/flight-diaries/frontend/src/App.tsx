import { useEffect, useState } from "react";

import { DiaryEntry } from "./types";
import { getAll } from "./services/diaryService";
import { Diaries } from "./components/Diaries";
import { NewEntry } from "./components/NewEntry";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    fetchDiaries();

    async function fetchDiaries() {
      const data = await getAll();
      setDiaries(data);
    }
  }, []);

  return (
    <div>
      <NewEntry />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
