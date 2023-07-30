import { SyntheticEvent, useState } from "react";
import { addDiary } from "../services/diaryService";

export const NewEntry = () => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    addDiary({ date, visibility, weather, comment });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  }

  return (
    <div>
      <h1>Add New Entry</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="date">date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Visibility:</p>
          <div>
            <input
              type="radio"
              name="visibility"
              id="great"
              value="great"
              checked={visibility === "great"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="great">great</label>
            <input
              type="radio"
              name="visibility"
              id="good"
              value="good"
              checked={visibility === "good"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="good">good</label>
            <input
              type="radio"
              name="visibility"
              id="ok"
              value="ok"
              checked={visibility === "ok"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="ok">ok</label>
            <input
              type="radio"
              name="visibility"
              id="poor"
              value="poor"
              checked={visibility === "poor"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="poor">poor</label>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Weather:</p>
          <div>
            <input
              type="radio"
              name="weather"
              id="sunny"
              value="sunny"
              checked={weather === "sunny"}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="sunny">sunny</label>
            <input
              type="radio"
              name="weather"
              id="rainy"
              value="rainy"
              checked={weather === "rainy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="rainy">rainy</label>
            <input
              type="radio"
              name="weather"
              id="cloudy"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="cloudy">cloudy</label>
            <input
              type="radio"
              name="weather"
              id="stormy"
              value="stormy"
              checked={weather === "stormy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="stormy">stormy</label>
            <input
              type="radio"
              name="weather"
              id="windy"
              value="windy"
              checked={weather === "windy"}
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="windy">windy</label>
          </div>
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};
