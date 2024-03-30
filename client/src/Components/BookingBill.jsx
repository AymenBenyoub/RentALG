import { useState } from "react";
import { PrimaryButton } from "./Buttons";
const BookingBill = () => {
  const [checkInDate, setCheckInDate] = useState(new Date(2024, 3, 1)); // April 1, 2024 (month starts at 0)
  const [checkOutDate, setCheckOutDate] = useState(new Date(2024, 3, 5)); // April 6, 2024
  //   const [guests, setGuests] = useState(1);

  const handleCheckInChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate.getTime() <= checkOutDate.getTime()) {
      setCheckInDate(selectedDate);
    } else {
      // Prevent state update for invalid check-in date
      event.target.value = checkInDate.toISOString().substring(0, 10); // Reset input value
    }
  };

  const handleCheckOutChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate.getTime() >= checkInDate.getTime()) {
      setCheckOutDate(selectedDate);
    } else {
      // Prevent state update for invalid check-out date
      event.target.value = checkOutDate.toISOString().substring(0, 10); // Reset input value
    }
  };

  //   const handleGuestChange = (event) => setGuests(parseInt(event.target.value));

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
          />
          <div className="check-out">CHECK-OUT</div>
          <input
            type="date"
            className="check-out-date"
            value={checkOutDate.toISOString().substring(0, 10)}
            onChange={handleCheckOutChange}
          />
        </div>
        <div className="guests">GUESTS</div>
        {/* <div className="number-of-guests">
          <button
            className="guest-control"
            onClick={() => setGuests(guests - 1)}
          >
            -
          </button>
          <input
            type="number"
            className="guest-input"
            value={guests}
            onChange={handleGuestChange}
            min={1}
          />
          <button
            className="guest-control"
            onClick={() => setGuests(guests + 1)}
          >
            +
          </button>
        </div> */}
      </div>
      <div className="breakdown">
        <div className="nightly-rate">
          <span>$124</span> night
          <span>x {nights} nights</span>
          <span className="total">= $ {124 * nights}</span>
        </div>
        <div className="cleaning-fee">
          Cleaning fee
          <span className="cleaning-fee-amount">$15</span>
        </div>
        <div className="rentalg-service-fee">
          RentALG service fee
          <span className="rentalg-service-fee-amount">$90</span>
        </div>
        <div className="total-before-taxes">
          Total before taxes
          <span className="total-before-taxes-amount">
            $ {124 * nights + 15 + 90}
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
