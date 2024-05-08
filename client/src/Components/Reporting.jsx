import { useState } from "react";
import Modal from "react-modal";

const Reporting = () => {
  const [showCheckBoxList1, setShowCheckBoxList1] = useState(false);
  const [showCheckBoxList2, setShowCheckBoxList2] = useState(false);
  const [showCheckBoxList3, setShowCheckBoxList3] = useState(false);
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

  const [clickedDivId, setClickedDivId] = useState(null);

  const handleDivClick = (event) => {
    const clickedId = event.target.id;
    setClickedDivId(clickedId);
  };

  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setClickedDivId(null);
    setShowCheckBoxList2(false);
    setShowCheckBoxList3(false);
    setShowCheckBoxList1(false);
  };
  return (
    <div onSubmit={handleSubmit}>
      <form>
        <button className="reporting-btn"></button>
      </form>

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
                <label className="report-checkbox">
                  Misleading or inaccurate information
                  <input
                    type="checkbox"
                    id="1.1"
                    onClick={handleDivClick}
                    checked={clickedDivId === "1.1"}
                  />
                </label>
                <br />
                <label className="report-checkbox">
                  It has cleanliness or maintenance problems
                  <input
                    type="checkbox"
                    id="1.2"
                    onClick={handleDivClick}
                    checked={clickedDivId === "1.2"}
                  />
                </label>
                <br />
                <label className="report-checkbox">
                  Unsafe living conditions
                  <input
                    type="checkbox"
                    id="1.3"
                    onClick={handleDivClick}
                    checked={clickedDivId === "1.3"}
                  />
                </label>
              </div>
            )}

            <div className="ReportOptions" onClick={toggleCheckBoxList2}>
              Host concerns
            </div>
            {showCheckBoxList2 && (
              <div>
                <label className="report-checkbox">
                  Unresponsive Host
                  <input
                    type="checkbox"
                    id="2.1"
                    onClick={handleDivClick}
                    checked={clickedDivId === "2.1"}
                  />
                </label>
                <br />
                <label className="report-checkbox">
                  Disrespectful Conduct
                  <input
                    type="checkbox"
                    id="2.2"
                    onClick={handleDivClick}
                    checked={clickedDivId === "2.2"}
                  />
                </label>
                <br />
                <label className="report-checkbox">
                  Host engages in illegal activity
                  <input
                    type="checkbox"
                    id="2.3"
                    onClick={handleDivClick}
                    checked={clickedDivId === "2.3"}
                  />
                </label>
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
                    id="other"
                    onChange={handleTextChange}
                    placeholder="Type your report..."
                    onClick={handleDivClick}
                  />
                </label>
              </div>
            )}
            <p>Clicked Div ID: {clickedDivId}</p>
          </div>
          <button
            className="submit"
            type="submit"
            onClick={closeModal}
            disabled={!clickedDivId}
          >
            Submit{" "}
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
