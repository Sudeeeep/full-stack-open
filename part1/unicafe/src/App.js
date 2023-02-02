import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ feedback }) => {
  let [good, neutral, bad] = feedback;

  let total = good + neutral + bad;
  let avg = ((good * 1 + bad * -1) / total).toFixed(2);
  let positive = ((good / total) * 100).toFixed(2) + "%";

  if (total === 0) {
    return (
      <div>
        <p>No Feedback given</p>
      </div>
    );
  }

  return (
    <>
      <h1>STATISTICS</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = [good, neutral, bad];

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
