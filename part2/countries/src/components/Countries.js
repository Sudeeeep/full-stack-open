import CountryInfo from "./CountryInfo";

const Country = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries
    .map((country) => country.name.common)
    .filter((name) => name.toLowerCase().includes(filter.toLowerCase()));

  if (filteredCountries.length > 10) {
    return <h2>Too many matches, specify another filter</h2>;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    const countriesToPrint = filteredCountries.map((country, index) => (
      <div key={index}>
        <h3 style={{ display: "inline", marginRight: "10px" }}> {country}</h3>
        <button onClick={() => setFilter(country)}>SHOW</button>
      </div>
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
