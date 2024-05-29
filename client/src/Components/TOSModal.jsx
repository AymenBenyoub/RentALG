import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function TextModal({ modalTitle, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={handleClick} className="openModal">
        {modalTitle}
      </div>
      {isOpen && (
        <div className="modal">
          <div className="modalcontent">
            <span className="close" onClick={handleClick}>
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
