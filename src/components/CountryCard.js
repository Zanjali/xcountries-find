import "./CountryCard.css";
const CountryCard = ({ name, flag }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={"Flag of " + name} className="flag" />
      <p>{name}</p>
    </div>
  );
};

export default CountryCard;