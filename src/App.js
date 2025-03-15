import { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]); // Stores all country data
  const [filteredCountries, setFilteredCountries] = useState([]); // Stores search results
  const [searchText, setSearchText] = useState(""); // Tracks search input
  const [error, setError] = useState(null); // Stores API errors

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
        setFilteredCountries(data); // Initialize filtered list
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

  // Handle search input and filter countries
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

  // Fetch countries on initial render
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

      {error && <p className="error">{error}</p>} {/* Show API error if present */}

      <div className="grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) =>
            country?.common && country?.png ? (
              <CountryCard
                key={index}
                name={country.common} // Corrected key for country name
                flag={country.png} // Corrected key for country flag
              />
            ) : null
          )
        ) : (
          !error && <p>No countries found</p> // Only show when no results
        )}
      </div>
    </div>
  );
}

export default App;
