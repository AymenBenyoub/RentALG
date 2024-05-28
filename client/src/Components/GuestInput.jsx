/* eslint-disable react/prop-types */
import { useState } from "react";
import { PiUsersThree } from "react-icons/pi";
const GuestInput = ({ onChange }) => {
  const [guests, setGuests] = useState("");
  const placeholderText = "guests";

  const handleChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 25) {
      setGuests(value);
      onChange(value);
    }
  };

  return (
    <div className="guest-input" style={{ position: "relative" }}>
      <input
        type="number"
        value={guests}
        onChange={handleChange}
        min={1}
        max={25}
        
        style={{ paddingRight: "18px", textAlign: "left" }} // Adjusted styles
      />
      <PiUsersThree />
      <span
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-60%)",
          left: "8px",
          pointerEvents: "none",
          color: "#aaa",
          transition: "opacity 0.2s ease",
          opacity: guests === "" ? 1 : 0,
        }}
      >
        {placeholderText}
      </span>
    </div>
  );
};

export default GuestInput;
