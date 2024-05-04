/* eslint-disable react/prop-types */

export default function HouseCard({ title, guests, price, thumbnail }) {
  const parsedThumbnail = thumbnail ? JSON.parse(thumbnail)[0] : null;
  console.log("thumbnail value:", parsedThumbnail);
  return (
    <div className="house-card">
      <img
        src={`http://localhost:3000/${parsedThumbnail}`}
        className="house-image"
      />
      <div className="house-details">
        <h2 className="house-title">{title}</h2>
        <p className="house-location">{guests} guests</p>
        <p className="house-price">{price}DA</p>
      </div>
    </div>
  );
}
