import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function TextModal({ modalTitle, modalContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  return (
    <>
      <button onClick={handleClick} className="openModal">
        {modalTitle}
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClick}>
              &times;
            </span>
            <p><h3>Report message :</h3> {modalContent}</p>
          </div>
        </div>
      )}
    </>
  );
}
