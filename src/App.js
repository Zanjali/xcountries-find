import { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const res = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      const data = await res.json();
      console.log("Fetched Countries:", data); // Debugging log

      setCountries(data);
      setFilteredCountries(data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
      setFilteredCountries([]);
    }
  };

  // Handle search filtering locally
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(
      (country) =>
        country?.common && 
        country.common.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredCountries(filtered);
  }, [searchText, countries]);

  // Fetch all countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div className="searchDiv">
        <input
          className="searchBox"
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => {
            console.log("Country Data:", country); 
            return country?.common && country?.png ? (
              <CountryCard
                key={index}
                name={country.common} 
                flag={country.png} // Corrected key for flag
              />
            ) : null;
          })
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </>
  );
}

export default App;
