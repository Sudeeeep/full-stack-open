import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all/")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <h1>COUNTRIES</h1>
      <div>
        Find Countries{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <Country countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default App;
