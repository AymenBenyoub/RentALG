/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

export default function ReservationCard({
  accommodationId,
  guest_id,
  name,
  phoneNumber,
  checkin,
  checkout,
  total,
  thumbnail,
  date,
}) {
  const parsedThumbnail = thumbnail ? JSON.parse(thumbnail)[0] : null;
  const navigate = useNavigate();
  return (
    <div
      className="reportcard"
      style={{
        padding: "0",
        width: "550px",
        height: "160px",
        marginLeft: "20px",
      }}
    >
      <div className="report-details">
        <img
          src={`http://localhost:3000/${parsedThumbnail}`}
          className="reported-house-image"
          style={{ height: "156px", width: "160px" }}
          onClick={() => navigate(`/listings/${accommodationId}`)}
        />
        <div className="report-info">
          <p
            className="username"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation;
              navigate("/profile/" + guest_id);
            }}
          >
            Guest: {name}
          </p>
          <p className="house-price">phone: {phoneNumber}</p>
          <p className="house-price">
            From: {checkin} - To: {checkout}
          </p>{" "}
          <p className="house-location" style={{ margin: "10px 0 0 0" }}>
            Total: {total}DA - Booked on: {date}
          </p>
        </div>
      </div>
    </div>
  );
}
