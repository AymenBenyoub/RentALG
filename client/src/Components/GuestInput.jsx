import { useState } from "react";

const GuestInput = () => {
  const [guests, setGuests] = useState(1);

  const handleChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 25) {
      setGuests(value);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={guests}
        onChange={handleChange}
        min={1}
        max={25}
        className="guest-input"
      />
    </div>
  );
};

export default GuestInput;
