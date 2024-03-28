import { useState } from "react";

const CheckboxDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState([
    { id: 1, label: "House" },
    { id: 2, label: "Apartment" },
    { id: 3, label: "Room" },
  ]);

  const options = [
    { id: 1, label: "House" },
    { id: 2, label: "Apartment" },
    { id: 3, label: "Room" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    const selectedIndex = selectedItems.findIndex(
      (item) => item.id === option.id
    );

    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, option]);
    } else {
      const updatedSelectedItems = selectedItems.filter(
        (item) => item.id !== option.id
      );
      setSelectedItems(updatedSelectedItems);
    }
  };

  return (
    <div className="checkbox-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        Accommodation type
        <i className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
      </div>

      {isOpen && (
        <div className="dropdown-content">
          {options.map((option) => (
            <label key={option.id}>
              <input
                type="checkbox"
                checked={selectedItems.some((item) => item.id === option.id)}
                onChange={() => handleCheckboxChange(option)}
              />

              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
