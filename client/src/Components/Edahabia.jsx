/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { FaCreditCard, FaLock } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function Edahabia({
  checkInDate,
  checkOutDate,
  total,
  listing,
  reservations,
  host_id,
}) {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardExpires, setCardExpires] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();
  function formatExpires(value) {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^([2-9])$/g, "0$1")
      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
      .replace(/^0{1,}/g, "0")
      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
  }

  function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }

  function convertDateToMySQLFormat(dateStr) {
    const parts = dateStr.split("/");

    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  }

  const today = convertDateToMySQLFormat(new Date().toLocaleDateString());

  const handleConfirm = async () => {
    try {
      const overlap = reservations.some(
        (reservation) =>
          new Date(reservation.check_in_date) < new Date(checkOutDate) &&
          new Date(reservation.check_out_date) > new Date(checkInDate)
      );

      if (overlap) {
        alert(
          "Reservation failed. There are existing reservations for the selected dates."
        );
      } else {
        const response = await fetch(
          "http://api.localhost:3000/api/reservations/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accommodation_id: listing,
              guest_id: user.id,
              check_in_date: convertDateToMySQLFormat(
                checkInDate.toLocaleDateString()
              ),
              check_out_date: convertDateToMySQLFormat(
                checkOutDate.toLocaleDateString()
              ),
              total_price: total,
              reservation_date: today,
            }),
          }
        );

        if (response.ok) {
          alert("Reservation successful!");
          closeModal();
          setTimeout(() => {
            navigate("/bookings");
          }, 100);
        } else {
          alert("Failed to make a reservation. Please try again.");
        }
      }
    } catch (error) {
      console.error("Failed to book", error);
      alert("Failed to make a reservation. Please try again.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {user && user.role !== "admin"  && 
      <button
        className="ReserveButton"
        onClick={openModal}
        disabled={!user || user.is_banned === 1 || user.id === host_id}
      >
        Reserve
      </button>
}
      {isModalOpen && (
        <div className="ReserveModal">
          <div className="ReserveModal-content">
            <span className="ReserveClose" onClick={closeModal}>
              &times;
            </span>
            <h2 style={{ marginTop: "-20px", marginLeft: "180px" }}>
              Pay with Edahabia
            </h2>

            <h4 style={{ marginLeft: "60px" }}>Your Name :</h4>
            <input
              style={{
                width: "400px",
                marginLeft: "55px",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "20px",
              }}
              type="text"
              placeholder="Name"
              required
            />

            <h4 style={{ marginLeft: "60px", marginTop: "5px" }}>
              Card Number :
            </h4>
            <div style={{ display: "inline-flex" }}>
              <input
                className="CardNumber"
                style={{
                  width: "400px",
                  marginLeft: "55px",
                  padding: "9px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                }}
                value={formatCardNumber(cardNumber)}
                onChange={(event) => setCardNumber(event.target.value)}
                maxLength={19}
                placeholder="0000 0000 0000 0000"
                title="Please enter only numbers"
                required
              />
              <FaCreditCard
                style={{
                  marginLeft: "445px",
                  marginTop: "8px",
                  position: "absolute",
                  top: "302px",
                }}
              />
            </div>

            <h4 style={{ marginLeft: "300px", marginTop: "5px" }}>Expires:</h4>
            <input
              type="text"
              style={{
                width: "150px",
                marginLeft: "300px",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "20px",
              }}
              maxLength={5}
              placeholder="00/00"
              value={formatExpires(cardExpires)}
              onChange={(event) => setCardExpires(event.target.value)}
              required
            />

            <h4 style={{ marginLeft: "60px", marginTop: "-73px" }}>
              CVC2/CVV2:
            </h4>
            <input
              style={{
                width: "150px",
                marginLeft: "55px",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "20px",
              }}
              type="text"
              maxLength={3}
              placeholder="000"
              required
            />

            <br />

            <button
              className="paymentSubmit"
              type="submit"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <div
              className="disclaimer"
              style={{
                marginTop: "5px",
                marginLeft: "170px",
                display: "inline-flex",
              }}
            >
              <FaLock /> &nbsp; Payments are secure and encrypted
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
