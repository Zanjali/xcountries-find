import { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);

  // Fetch countries from API
  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched Countries:", data); // Debugging log

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

  // Filter countries based on search
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

  // Fetch data on initial render
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      {/* Search Bar */}
      <div className="searchDiv">
        <input
          className="searchBox"
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Display error if API fails */}
      {error && <p className="error">{error}</p>}

      {/* Country Cards Grid */}
      <div className="grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) =>
            country?.common && country?.png ? (
              <CountryCard key={index} name={country.common} flag={country.png} />
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
