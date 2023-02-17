const CountryInfo = ({ countries, filteredCountries }) => {
  const countryInfo = countries.filter(
    (country) => country.name.common === filteredCountries[0]
  );

  const languages = Object.values(countryInfo[0].languages).map((item, key) => (
    <li key={key}>{item}</li>
  ));

  return (
    <div>
      <h2>{countryInfo[0].name.common}</h2>

      <p>Capital: {countryInfo[0].capital}</p>
      <p>Area: {countryInfo[0].area}</p>

      <div>
        <h3>Languages</h3>
        <ul>{languages}</ul>
      </div>

      <img src={countryInfo[0].flags.png} alt={countryInfo[0].flags.alt} />
    </div>
  );
};

export default CountryInfo;
