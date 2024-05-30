/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { FaLock } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

export default function CCP({
  checkInDate,
  checkOutDate,
  total,
  listing,
  reservations,
  host_id,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    accountNumber: "",
    accountKey: "",
    address: "",
  });
  const { user } = useContext(UserContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function convertDateToMySQLFormat(dateStr) {
    const parts = dateStr.split("/");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  const today = convertDateToMySQLFormat(new Date().toLocaleDateString());

  const handleConfirm = async () => {
    try {
      // Check if there is an existing reservation for the selected dates
      const overlap = reservations.some(
        (reservation) =>
          new Date(reservation.check_in_date) < new Date(checkOutDate) &&
          new Date(reservation.check_out_date) > new Date(checkInDate)
      );

      if (overlap) {
        alert(
          "Reservation failed. There are existing reservations for the selected dates."
        );
        return;
      }

      const response = await fetch(
        `http://api.localhost:3000/api/reservations/`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
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
        window.location.reload();
      } else {
        alert("Failed to make a reservation. Please try again.");
      }
    } catch (error) {
      console.error("Failed to book", error);
    }
  };

  return (
    <div>
      {user && user.role !== "admin" && (
        <button
          className="ReserveButton"
          onClick={openModal}
          disabled={!user || user.is_banned === 1 || user.id === host_id}
        >
          Reserve
        </button>
      )}
      {isModalOpen && (
        <div className="ReserveModal">
          <div className="ReserveModal-content">
            <span className="ReserveClose" onClick={closeModal}>
              &times;
            </span>
            <h2 style={{ marginTop: "-20px", marginLeft: "180px" }}>
              Pay with CCP
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
              name="name"
              value={userInput.name}
              onChange={handleChange}
              placeholder="Name"
            />

            <div style={{ display: "flex" }}>
              <h4 style={{ marginLeft: "60px" }}>Account Number :</h4>
              <h4 style={{ marginLeft: "110px" }}>Account key:</h4>
            </div>
            <div style={{ display: "inline-flex" }}>
              <input
                className="CardNumber"
                style={{
                  width: "200px",
                  marginLeft: "55px",
                  padding: "9px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                }}
                type="text"
                name="accountNumber"
                value={userInput.accountNumber}
                onChange={handleChange}
                maxLength={10}
                placeholder="0000000000"
                title="Please enter only numbers"
              />

              <input
                style={{
                  width: "150px",
                  marginLeft: "30px",
                  padding: "9px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                }}
                type="text"
                name="accountKey"
                value={userInput.accountKey}
                onChange={handleChange}
                maxLength={2}
                placeholder="00"
              />
            </div>

            <h4 style={{ marginLeft: "60px", marginTop: "10px" }}>
              Your Address :
            </h4>
            <input
              style={{
                width: "400px",
                marginLeft: "55px",
                padding: "9px",
                border: "1px solid #ccc",
                borderRadius: "20px",
              }}
              type="text"
              name="address"
              value={userInput.address}
              onChange={handleChange}
              placeholder="Ex: Tlemcen"
            />

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
