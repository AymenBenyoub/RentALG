/* eslint-disable react/prop-types */
export default function TextInput({ onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <input
      type="text"
      className="destination-input"
      placeholder="Search destinations"
      onChange={handleChange}
    />
  );
}
