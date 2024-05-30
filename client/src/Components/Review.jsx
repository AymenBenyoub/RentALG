/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
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

function Review({ accommodationId, host_id }) {
  const [clickedAttributeValue, setClickedAttributeValue] = useState(null);
  const [showCheckBoxList1, setShowCheckBoxList1] = useState(false);
  const [numberOfAttributes, setNumberOfAttributes] = useState(0);
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();
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
    setNumberOfAttributes(() => parseInt(attributeValue));
  };

  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/reviews`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          rating: clickedAttributeValue,
          reviewer_id: user.id,
          accommodation_id: accommodationId,
          review_text: text,
        }),
      });
      if (!response.ok) {
        console.error("error creating review: NETWORK ERROR");
      }
      console.log("created review successfully");
      window.location.reload();
    } catch (error) {
      console.log("error creating review: ", error);
    }

    setClickedAttributeValue(null);
    setText("");
  };

  return (
    <div className="review-input-container">
      <div className="review-text" onClick={toggleCheckBoxList1}>
        <label htmlFor="text"></label>
        <input
          type="text"
          className="reviewtext"
          value={text}
          onChange={handleTextChange}
          disabled={!user || user.is_banned === 1 || user.id === host_id}
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
            onClick={(e) => {
              handleSubmit(e);
              closeModal(e);
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Review;
