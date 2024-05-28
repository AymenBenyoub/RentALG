/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CCP from "./CCP";
import Edahabia from "./Edahabia";

const BookingBill = ({ price, payment, listing, host_id }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, [listing]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations/accommodation/${listing}`
      );
      const data = await response.json();
      setReservations(data);
      setUnavailableDates(getUnavailableDates(data));
      setInitialDates();
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const getUnavailableDates = (reservations) => {
    return reservations.flatMap((reservation) => {
      const checkIn = new Date(reservation.check_in_date);
      const checkOut = new Date(reservation.check_out_date);
      const dates = [];
      let currentDate = new Date(checkIn);
      while (currentDate < checkOut) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    });
  };

  const setInitialDates = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let nextAvailableCheckIn = new Date(today);
    while (isDateUnavailable(nextAvailableCheckIn)) {
      nextAvailableCheckIn.setDate(nextAvailableCheckIn.getDate() + 1);
    }

    let nextAvailableCheckOut = new Date(nextAvailableCheckIn);
    nextAvailableCheckOut.setDate(nextAvailableCheckOut.getDate() + 1);

    setCheckInDate(nextAvailableCheckIn);
    setCheckOutDate(nextAvailableCheckOut);
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        unavailableDate.toISOString().substring(0, 10) ===
        date.toISOString().substring(0, 10)
    );
  };

  const handleCheckInChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setUTCHours(0, 0, 0, 0);

    if (!isDateUnavailable(selectedDate)) {
      setCheckInDate(selectedDate);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      setCheckOutDate(nextDay);
    } else {
      event.target.value = "";
    }
  };

  const handleCheckOutChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setUTCHours(0, 0, 0, 0);
    if (selectedDate > checkInDate && !isDateUnavailable(selectedDate)) {
      setCheckOutDate(selectedDate);
    } else {
      event.target.value = "";
    }
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffInDays = Math.floor(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffInDays > 0 ? diffInDays : 0;
    }
    return 0;
  };

  const nights = calculateNights();

  const total = parseFloat(price * nights + price * nights * 0.13).toFixed(2);

  return (
    <div className="checkout">
      <div className="reservation-summary">
        <div className="reservation-details">
          <div className="check-in">CHECK-IN</div>
          <input
            type="date"
            className="check-in-date"
            value={
              checkInDate ? checkInDate.toISOString().substring(0, 10) : ""
            }
            onChange={handleCheckInChange}
            min={new Date().toISOString().substring(0, 10)}
          />
          <div className="check-out">CHECK-OUT</div>
          <input
            type="date"
            className="check-out-date"
            value={
              checkOutDate ? checkOutDate.toISOString().substring(0, 10) : ""
            }
            onChange={handleCheckOutChange}
            min={
              checkInDate
                ? new Date(checkInDate.getTime() + 1000 * 60 * 60 * 24)
                    .toISOString()
                    .substring(0, 10)
                : ""
            }
            disabled={!checkInDate}
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
          <span className="total-before-taxes-amount">DZD {total}</span>
        </div>
        {payment === "credit_card" ? (
          <Edahabia
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            total={total}
            listing={listing}
            reservations={reservations}
            host_id={host_id}
          />
        ) : (
          <CCP
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            total={total}
            listing={listing}
            reservations={reservations}
            host_id={host_id}
          />
        )}
        <div className="disclaimer">You won&apos;t be charged yet</div>
      </div>
    </div>
  );
};

export default BookingBill;