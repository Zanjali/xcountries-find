import React from "react";

function CountryCard({ name, flag }) {
  return (
    <div className="countryCard">
      <img src={flag} alt={`${name} flag`} />
      <h2>{name}</h2>
    </div>
  );
}

export default CountryCard;
