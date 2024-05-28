/* eslint-disable react/prop-types */
import { useState } from "react";
import { LiaMoneyBillWaveSolid , LiaMoneyBillWaveAltSolid} from "react-icons/lia";
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
      <div className="price-filter-input">
        <input
          type="number"
          value={minPrice === "" ? "" : parseInt(minPrice)}
          onChange={handleMinChange}
          min={0}
          placeholder="Min price"
          
          inputMode="numeric"
          pattern="\d*"
        />
        <LiaMoneyBillWaveSolid />
      </div>
      <div  className="price-filter-input">
        <input
          type="number"
          value={maxPrice === "" ? "" : parseInt(maxPrice)}
          onChange={handleMaxChange}
          min={0}
          placeholder="Max price"
         
          inputMode="numeric"
          pattern="\d*"
        />
        <LiaMoneyBillWaveAltSolid />
      </div>
    </div>
  );
};

export default PriceFilter;
