/* eslint-disable react/prop-types */
import { useState } from "react";
import { PrimaryButton } from "./Buttons";

const BookingBill = ({ price }) => {
  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(today.getTime() + 1000 * 60 * 60 * 24)
  );

  const handleCheckInChange = (event) => {
    const selectedDate = new Date(event.target.value);

    if (
      selectedDate.getTime() >= today.getTime() &&
      selectedDate.getTime() <= checkOutDate.getTime()
    ) {
      setCheckInDate(selectedDate);
    } else {
      event.target.value = checkInDate.toISOString().substring(0, 10);
    }
  };

  const handleCheckOutChange = (event) => {
    const selectedDate = new Date(event.target.value);

    if (selectedDate.getTime() >= checkInDate.getTime()) {
      setCheckOutDate(selectedDate);
    } else {
      event.target.value = checkOutDate.toISOString().substring(0, 10);
    }
  };

  const calculateNights = () => {
    const diffInDays = Math.floor(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    return diffInDays > 0 ? diffInDays : 0;
  };

  const nights = calculateNights();

  return (
    <div className="checkout">
      <div className="reservation-summary">
        <div className="reservation-details">
          <div className="check-in">CHECK-IN</div>
          <input
            type="date"
            className="check-in-date"
            value={checkInDate.toISOString().substring(0, 10)}
            onChange={handleCheckInChange}
            min={today.toISOString().substring(0, 10)}
          />
          <div className="check-out">CHECK-OUT</div>
          <input
            type="date"
            className="check-out-date"
            value={checkOutDate.toISOString().substring(0, 10)}
            onChange={handleCheckOutChange}
            min={new Date(today.getTime() + 1000 * 60 * 60 * 24)
              .toISOString()
              .substring(0, 10)}
          />
        </div>
      </div>
      <div className="breakdown">
        <div className="nightly-rate">
          <span>{price} </span>
          <span>&nbsp;x {nights} nights</span>
          <span className="total">
            DZD {parseFloat(price * nights).toFixed(2)}
          </span>
        </div>
        <div className="rentalg-service-fee">
          RentALG service fee
          <span className="rentalg-service-fee-amount">
            DZD {parseFloat(price * nights * 0.13).toFixed(2)}
          </span>
        </div>
        <div className="total-before-taxes">
          Total
          <span className="total-before-taxes-amount">
            DZD {parseFloat(price * nights + price * nights * 0.13).toFixed(2)}
          </span>
        </div>
        <PrimaryButton
          text="Reserve"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "45px auto 5px auto",
            width: "85%",
          }}
        />
        <div className="disclaimer">You won&apos;t be charged yet</div>
      </div>
    </div>
  );
};

export default BookingBill;
