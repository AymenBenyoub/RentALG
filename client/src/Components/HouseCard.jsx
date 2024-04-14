import p1 from "./pics/1.webp";
export default function HouseCard() {
  return (
    <div className="house-card">
      <img src={p1} alt="RETARD" className="house-image" />
      <div className="house-details">
        <h2 className="house-title">Appartement in Oran</h2>
        <p className="house-location">3 guests</p>
        <p className="house-price">6500 DZD per night</p>
      </div>
    </div>
  );
}
