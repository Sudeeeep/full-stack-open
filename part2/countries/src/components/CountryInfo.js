import { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ countries, filteredCountries }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&appid=${api_key}&units=metric`
      )
      .then((response) => setWeather(response.data));
  }, []);

  const api_key = process.env.REACT_APP_API_KEY;

  const countryInfo = countries.filter(
    (country) => country.name.common === filteredCountries[0]
  );

  const country = countryInfo[0];
  const latlon = country.capitalInfo.latlng;

  const languages = Object.values(country.languages).map((item, key) => (
    <li key={key}>{item}</li>
  ));

  function displayWeather() {
    if (weather !== null) {
      return (
        <>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      );
    }
  }

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <div>
        <h3>Languages</h3>
        <ul>{languages}</ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        {displayWeather()}
      </div>
    </div>
  );
};

export default CountryInfo;
