import mus from "./pics/mus.jpg";
export default function HouseCard() {
  return (
    <div className="house-card">
      <img src={mus} alt="RETARD" className="house-image" />
      <div className="house-details">
        <h2 className="house-title">MUSTAPHA</h2>
        <p className="house-location">RETARD</p>
        <p className="house-price">0 DZD per night</p>
      </div>
    </div>
  );
}
