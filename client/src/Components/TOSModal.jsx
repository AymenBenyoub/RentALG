import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function TextModal({ modalTitle, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={handleClick} className="openModal">
        {modalTitle}
      </button>
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
