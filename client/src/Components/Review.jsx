/* eslint-disable react/prop-types */
import { useState } from "react";

function ButtonWithAttribute({ attribute, onClick, isActive }) {
  return (
    <button
      type="button"
      className={`starReview ${isActive ? "active" : ""}`}
      value={attribute}
      onClick={() => onClick(attribute)}
    ></button>
  );
}

function Review() {
  const [clickedAttributeValue, setClickedAttributeValue] = useState(null);
  const [showCheckBoxList1, setShowCheckBoxList1] = useState(false);
  const [numberOfAttributes, setNumberOfAttributes] = useState(0);

  const toggleCheckBoxList1 = () => {
    setShowCheckBoxList1(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setShowCheckBoxList1(false);
    setClickedAttributeValue(null);
    setText("");
  };

  const handleClick = (attributeValue) => {
    setClickedAttributeValue(attributeValue);
    setNumberOfAttributes((prev) => parseInt(attributeValue));
  };

  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setClickedAttributeValue(null);
    setText("");
  };

  return (
    <div onSubmit={handleSubmit} className="review-input-container">
      <div className="review-text" onClick={toggleCheckBoxList1}>
        <label htmlFor="text"></label>
        <input
          type="text"
          className="reviewtext"
          value={text}
          onChange={handleTextChange}
          placeholder="Type your review..."
        />
      </div>

      <div
        className="bb"
        style={{ display: showCheckBoxList1 ? "block" : "none" }}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <ButtonWithAttribute
            key={value}
            attribute={value.toString()}
            onClick={handleClick}
            isActive={parseInt(clickedAttributeValue) >= value}
          />
        ))}
        {clickedAttributeValue && (
          <p>Clicked button attribute value: {clickedAttributeValue}</p>
        )}
      </div>

      {showCheckBoxList1 && (
        <div className="review-btns-container">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="submit-btn"
            type="submit"
            disabled={!clickedAttributeValue || !text}
            onClick={closeModal}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Review;
