import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched Countries:", data);

      if (Array.isArray(data)) {
        setCountries(data);
        setFilteredCountries(data);
      } else {
        console.error("Unexpected API response format");
        setCountries([]);
        setFilteredCountries([]);
      }
    } catch (err) {
      console.error("Error fetching countries:", err);
      setError("Failed to load countries.");
      setCountries([]);
      setFilteredCountries([]);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) =>
          country?.common &&
          country.common.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchText, countries]);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <div className="searchDiv">
        <input
          className="searchBox"
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) =>
            country?.common && country?.png ? (
              <div key={index} className="countryCard">
                <img src={country.png} alt={`${country.common} flag`} />
                <h3>{country.common}</h3>
              </div>
            ) : null
          )
        ) : (
          !error && <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
