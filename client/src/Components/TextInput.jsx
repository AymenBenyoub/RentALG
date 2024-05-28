/* eslint-disable react/prop-types */
import { ImSearch } from "react-icons/im";
export default function TextInput({ onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className="destination-input">
    <input
      type="text"
      
      placeholder="Search destinations"
      onChange={handleChange}
    />
    <ImSearch />
    </div>
  );
}
