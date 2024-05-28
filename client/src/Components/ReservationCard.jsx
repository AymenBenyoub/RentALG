/* eslint-disable react/prop-types */

export default function ReservationCard({
  title,
  checkin,
  checkout,
  total,
  thumbnail,
  date,
}) {
  const parsedThumbnail = thumbnail ? JSON.parse(thumbnail)[0] : null;

  return (
    <div className="house-card">
      <img
        src={`http://localhost:3000/${parsedThumbnail}`}
        className="house-image"
      />
      <div className="house-details">
        <h2 className="house-title">{title}</h2>
        <p className="house-location">
          Total: {total}DA - Booked on: {date}
        </p>
        <p className="house-price">
          From: {checkin} - To: {checkout}
        </p>
      </div>
    </div>
  );
}
