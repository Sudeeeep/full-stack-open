import CountryInfo from "./CountryInfo";

const Country = ({ countries, filter }) => {
  const filteredCountries = countries
    .map((country) => country.name.common)
    .filter((name) => name.toLowerCase().includes(filter.toLowerCase()));

  if (filteredCountries.length > 10) {
    return <h2>Too many matches, specify another filter</h2>;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    const countriesToPrint = filteredCountries.map((country, index) => (
      <h3 key={index}> {country}</h3>
    ));
    return <div>{countriesToPrint}</div>;
  } else if (filteredCountries.length === 1) {
    return (
      <CountryInfo
        countries={countries}
        filteredCountries={filteredCountries}
      />
    );
  }
};

export default Country;
