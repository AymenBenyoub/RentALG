/* eslint-disable react/prop-types */
import { useState } from "react";

const PriceFilter = ({ onChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    onChange(value, maxPrice);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    onChange(minPrice, value);
  };

  return (
    <div className="price-filter-container">
      <div>
        <input
          type="number"
          value={minPrice === "" ? "" : parseInt(minPrice)}
          onChange={handleMinChange}
          min={0}
          placeholder="Min price"
          className="price-filter-input"
          inputMode="numeric"
          pattern="\d*"
        />
      </div>
      <div>
        <input
          type="number"
          value={maxPrice === "" ? "" : parseInt(maxPrice)}
          onChange={handleMaxChange}
          min={0}
          placeholder="Max price"
          className="price-filter-input"
          inputMode="numeric"
          pattern="\d*"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
