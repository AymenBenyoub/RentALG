/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import Modal from "react-modal";
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line no-unused-vars
const Reporting = ({ accommodationId, host_id }) => {
  const [showCheckBoxList1, setShowCheckBoxList1] = useState(false);
  const [showCheckBoxList2, setShowCheckBoxList2] = useState(false);
  const [showCheckBoxList3, setShowCheckBoxList3] = useState(false);
  const [clickedDivId, setClickedDivId] = useState(null);
  const [text, setText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const ReportOptions = {
    1.1: "Misleading",
    1.2: "Unclean",
    1.3: "Unsafe",
    2.1: "Unresponsive",
    2.2: "Disrespectful",
    2.3: "Illegal activity",
    3: "Other",
  };

  const toggleCheckBoxList1 = () => {
    setShowCheckBoxList1(!showCheckBoxList1);
    setShowCheckBoxList2(false);
    setShowCheckBoxList3(false);
  };

  const toggleCheckBoxList2 = () => {
    setShowCheckBoxList2(!showCheckBoxList2);
    setShowCheckBoxList1(false);
    setShowCheckBoxList3(false);
  };

  const toggleCheckBoxList3 = () => {
    setShowCheckBoxList3(!showCheckBoxList3);
    setShowCheckBoxList2(false);
    setShowCheckBoxList1(false);
  };

  const handleDivClick = (event) => {
    const clickedId = event.target.id;
    setClickedDivId(clickedId);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          report_reason: ReportOptions[clickedDivId],
          report_text: text,
          reporting_user: user.id,
          reported_accommodation: accommodationId,
          reported_user: host_id,
        }),
      });

      if (!response.ok) {
        console.error("Couldn't submit report: NETWORK ERROR");
      } else {
        console.log("Report successfully submitted");
      }
    } catch (error) {
      console.error("error submitting report", error);
    }

    closeModal();
    alert("Your report was successfully submitted.");
  };

  const openModal = () => {
    if (user) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setClickedDivId(null);
    setShowCheckBoxList2(false);
    setShowCheckBoxList3(false);
    setShowCheckBoxList1(false);
    setText("");
  };

  return (
    <div>
      {user && user.role !== "admin"  && 
      <button
        className="reporting-btn"
        onClick={openModal}
        disabled={user && (user.is_banned === 1 || user.id === host_id)}
      ></button>
  }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="CheckBoxList Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modall-content">
          <div>
            <div className="why">Report listing</div>
            <div className="ReportOptions" onClick={toggleCheckBoxList1}>
              Listing concerns
            </div>
            {showCheckBoxList1 && (
              <div>
                {Object.entries(ReportOptions)
                  .filter(([id]) => id.startsWith("1"))
                  .map(([id, option]) => (
                    <label key={id} className="report-checkbox">
                      {option}
                      <input
                        type="checkbox"
                        id={id}
                        onClick={handleDivClick}
                        checked={clickedDivId === id}
                      />
                    </label>
                  ))}
              </div>
            )}

            <div className="ReportOptions" onClick={toggleCheckBoxList2}>
              Host concerns
            </div>
            {showCheckBoxList2 && (
              <div>
                {Object.entries(ReportOptions)
                  .filter(([id]) => id.startsWith("2"))
                  .map(([id, option]) => (
                    <label key={id} className="report-checkbox">
                      {option}
                      <input
                        type="checkbox"
                        id={id}
                        onClick={handleDivClick}
                        checked={clickedDivId === id}
                      />
                    </label>
                  ))}
              </div>
            )}
            <div className="ReportOptions" onClick={toggleCheckBoxList3}>
              Other
            </div>
            {showCheckBoxList3 && (
              <div>
                <label className="report-checkbox">
                  <input
                    type="text"
                    value={text}
                    className="reviewtext"
                    id="3"
                    onChange={handleTextChange}
                    placeholder="Type your report..."
                    onClick={handleDivClick}
                  />
                </label>
              </div>
            )}
          </div>
          <button
            className="submit"
            onClick={handleSubmit}
            disabled={!clickedDivId}
          >
            Submit
          </button>
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Reporting;
