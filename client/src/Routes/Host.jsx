import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/HostForm.css";
import houseIcon from "../assets/house_icon.jpeg";
import sharedroom_Icon from "../assets/sharedroom_icon.png";
import roomIcon from "../assets/room_icon.jpeg";
import virement1 from "../assets/virement1.jpeg";
import carte1 from "../assets/carte1.jpeg";
import { UserContext } from "../context/UserContext";
import { FaCreditCard } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import {
  FaWifi,
  FaUtensils,
  FaSwimmingPool,
  FaDumbbell,
  FaParking,
} from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { GiBathtub, GiWaveSurfer } from "react-icons/gi";
import { MdOutdoorGrill } from "react-icons/md";

export default function Host() {
  const [formValues, setformValues] = useState({
    accommodation_type: "",
    location: "",
    max_guests: 1,
    title: "",
    description: "",
    amenities: {
      wifi: false,
      kitchen: false,
      gym: false,
      bathtub: false,
      tv: false,
      garage: false,
      pool: false,
      beachView: false,
      bbqGrill: false,
    },
    price_per_night: "",
    payment_type: "",
  });
  const { user } = useContext(UserContext);
  const [max_guests, setmax_guests] = useState(1);
  const navigate = useNavigate();
  const guestInputRef = useRef(null);

  const incrementGuests = (e) => {
    e.preventDefault();
    setformValues((prevData) => ({
      ...prevData,
      max_guests: prevData.max_guests + 1,
    }));
    setmax_guests((prevValue) => prevValue + 1);
    guestInputRef.current.focus();
  };

  const decrementGuests = (e) => {
    e.preventDefault();
    if (formValues.max_guests > 1) {
      setformValues((prevData) => ({
        ...prevData,
        max_guests: prevData.max_guests - 1,
      }));
      setmax_guests((prevValue) => prevValue - 1);
    }
    guestInputRef.current.focus();
  };

  const [pictures, setpictures] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setpictures(files);
    setformValues((prevData) => ({
      ...prevData,
      pictures: files,
    }));
  };

  const handleAnchorClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleprice_per_nightChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/\D/g, "");
    let numericValue = parseInt(newValue, 10);
    const minprice_per_night = 0;
    const maxprice_per_night = 1000000;
    if (numericValue >= maxprice_per_night) {
      newValue = maxprice_per_night.toString();
    }
    if (numericValue < minprice_per_night) {
      newValue = minprice_per_night.toString();
    }
    setformValues({ ...formValues, price_per_night: newValue });
  };

  const handleaccommodation_typeChange = (type) => {
    setformValues({ ...formValues, accommodation_type: type });
  };

  const toggleFeature = (feature) => {
    setformValues((prevData) => ({
      ...prevData,
      amenities: {
        ...prevData.amenities,
        [feature]: !prevData.amenities[feature],
      },
    }));
  };

  const handlepayment_type = (method) => {
    setformValues({ ...formValues, payment_type: method });
  };

  ////////PaymentMethods///////////
  const [isEdahabia, setIsEdahabia] = useState(false);
  const [isCCP, setIsCCP] = useState(false);
  function formatExpires(value) {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^([2-9])$/g, "0$1")
      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
      .replace(/^0{1,}/g, "0")
      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
  }
  const [cardExpires, setCardExpires] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        host_id: user.id,
        accommodation_type: formValues.accommodation_type,
        title: formValues.title,
        description: formValues.description,
        price_per_night: formValues.price_per_night,
        max_guests: formValues.max_guests,
        location: formValues.location,
        payment_method: formValues.payment_type,
        amenities: Object.fromEntries(
          // eslint-disable-next-line no-unused-vars
          Object.entries(formValues.amenities).filter(([key, value]) => value)
        ),
      };

      const formValuesObj = new FormData();
      formValuesObj.append("formData", JSON.stringify(formData));

      for (const picture of pictures) {
        formValuesObj.append("pictures", picture);
      }

      const response = await fetch(
        "http://localhost:3000/api/accommodations/create",
        {
          method: "POST",

          body: formValuesObj,
        }
      );
      console.log(formValuesObj);
      if (!response.ok) {
        throw new Error("Failed to create accommodation");
      }

      const data = await response.json();
      console.log("Accommodation created successfully:", data);

      setformValues({
        accommodation_type: "",
        location: "",
        max_guests: 1,
        title: "",
        description: "",
        amenities: {
          wifi: false,
          kitchen: false,
          gym: false,
          bathtub: false,
          tv: false,
          garage: false,
          pool: false,
          beachView: false,
          bbqGrill: false,
        },
        price_per_night: "",
        payment_type: "",
      });
      setpictures([]);
      navigate("/");
    } catch (error) {
      console.error("Error creating accommodation:", error);
    }
  };
  const isFormValid = () => {
    return (
      formValues.accommodation_type &&
      formValues.location &&
      formValues.max_guests &&
      formValues.title &&
      formValues.description &&
      Object.values(formValues.amenities).some((value) => value) &&
      pictures.length > 0 &&
      formValues.price_per_night &&
      formValues.payment_type
    );
  };
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
    <Header/>
      <div className="host-form">
        <div className="host-form-content-wrapper">
         
          <form onSubmit={handleSubmit}>
            <div className="button-container">
              <h2>What type of place will guests have?</h2>
              <div className="listing-types">
                {" "}
                <button
                  type="button"
                  className={`listing-button ${
                    formValues.accommodation_type === "House" ? "active" : ""
                  }`}
                  onClick={() => handleaccommodation_typeChange("House")}
                  required
                >
                  <img src={houseIcon} alt="House" />
                  <span>House</span>
                </button>
                <button
                  type="button"
                  className={`listing-button ${
                    formValues.accommodation_type === "Shared room"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleaccommodation_typeChange("Shared room")}
                  required
                >
                  <img src={sharedroom_Icon} alt="Shared room" />
                  <span>Shared room</span>
                </button>
                <button
                  type="button"
                  className={`listing-button ${
                    formValues.accommodation_type === "Room" ? "active" : ""
                  }`}
                  onClick={() => handleaccommodation_typeChange("Room")}
                  required
                >
                  <img src={roomIcon} alt="Room" />
                  <span>Room</span>
                </button>
              </div>
            </div>
            <br />
            <h2>Where&apos;s your place located ?</h2>
            <div className="location">
              <label
                style={{
                  marginLeft: "150px",
                  fontSize: "18px",
                  color: "black",
                  marginTop: "2px",
                }}
                htmlFor="location"
              >
                Paste your location link here:
              </label>

              <input
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  width: "250px",
                  textAlign: "center",
                  margin: "0 0.5rem",
                  borderRadius: "8px",
                  color: "black",
                  marginLeft: "20px",
                }}
                id="location"
                name="location"
                placeholder="Enter location"
                value={formValues.location}
                onChange={(e) =>
                  setformValues({ ...formValues, location: e.target.value })
                }
                required
              />
            </div>
            <br />
            <h2>How much guests can you receive ?</h2>
            <label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",

                  paddingRight: "300px",
                }}
              >
                <p
                  style={{
                    margin: "0px 0px 0px -100px",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Max Guests:
                </p>

                <button
                  className="decguests"
                  onClick={decrementGuests}
                  required
                >
                  -
                </button>
                <span
                  style={{
                    backgroundColor: "gray",
                    padding: "0.5rem",
                    width: "150px",
                    textAlign: "center",
                    margin: "0 0.5rem",
                    borderRadius: "8px",
                  }}
                >
                  {max_guests}
                </span>
                <button className="incguests" onClick={incrementGuests}>
                  +
                </button>
              </div>
            </label>
            <br />
         
            <br />
            <h2 style={{ margin: "-10px", marginLeft: "50px" }}>
              What your place has to offer ?
            </h2>

            <div className="amenities">
              <div className="row">
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.wifi}
                    onChange={() => toggleFeature("wifi")}
                  />
                  <p><FaWifi />Wifi</p>
                </label>
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.kitchen}
                    onChange={() => toggleFeature("kitchen")}
                    style={{ marginLeft: "27px" }}
                  />
                  <p><FaUtensils />Kitchen</p>
                </label>
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.gym}
                    onChange={() => toggleFeature("gym")}
                  />
                  <p><FaDumbbell /> Gym</p>
                </label>
              </div>
              <div className="row">
                {" "}
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.bbqGrill}
                    onChange={() => toggleFeature("bbqGrill")}
                  />
                  <p><MdOutdoorGrill />BBQ Grill</p>
                </label>
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.bathtub}
                    onChange={() => toggleFeature("bathtub")}
                  />
                  <p><GiBathtub /> Bath tub</p>
                </label>
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.tv}
                    onChange={() => toggleFeature("tv")}
                  />
                  <p style={{ marginRight: "35px" }}><PiTelevisionSimpleBold />TV</p>
                </label>
              </div>
              <div className="row">
                {" "}
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.garage}
                    onChange={() => toggleFeature("garage")}
                  />
                  <p><FaParking />Garage</p>
                </label>
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.pool}
                    onChange={() => toggleFeature("pool")}
                  />
                  <p style={{ marginRight: "20px" }}><FaSwimmingPool />Pool</p>
                </label>
                <label className="amenitiy">
                  <input
                    type="checkbox"
                    checked={formValues.amenities.beachView}
                    onChange={() => toggleFeature("beachView")}
                    style={{ marginLeft: "30px" }}
                  />
                  <p><GiWaveSurfer />Beach view</p>
                </label>
              </div>
            </div>

            <h2>Add some pictures of your house.</h2>

            <div>
              <a
                href="#"
                onClick={handleAnchorClick}
                style={{
                  display: "inline-block",
                  marginLeft: "430px",
                  padding: "10px",
                  color: "black",
                  textDecoration: "underline",
                  borderRadius: "5px",
                }}
                required
              >
                Upload images from your device.
              </a>
              <input
                type="file"
                ref={fileInputRef}
                name="pictures"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
                multiple
                required
              />
              <br />
              <br />
              {pictures.map((file, index) => (
                <div className="index" key={index}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  <p
                    style={{
                      marginLeft: "-30px",
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  ></p>
                </div>
              ))}
            </div>
            <br />
            <h2>Now, let&apos;s give your house a title.</h2>
            <p
              style={{
                marginLeft: "50px",
                fontSize: "15px",

                marginTop: "-20px",
              }}
            >
              Short titles work best. Have fun with it—you can always change it
              later.
            </p>
            <textarea
              rows={5}
              style={{
                marginLeft: "100px",
                height: "50px",
                border: "1.6px solid black",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                outline: "none",
              }}
              value={formValues.title}
              onChange={(e) =>
                setformValues({ ...formValues, title: e.target.value })
              }
              required
            />
            <h2>Create your description.</h2>
            <p
              style={{
                marginLeft: "50px",
                fontSize: "15px",

                marginTop: "-20px",
              }}
            >
              Share what makes your place special..
            </p>
            <textarea
              className="text2"
              rows={5}
              style={{
                marginLeft: "100px",
                height: "180px",
                outline: "none",
                border: "1.6px solid black",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              value={formValues.description}
              onChange={(e) =>
                setformValues({ ...formValues, description: e.target.value })
              }
              required
            />
            <br />
            <h2>Now, set your price.</h2>
            <p
              style={{
                margin: "-20px 0 -20px 50px",
                fontSize: "18px",
                color: "gray",
              }}
            >
              You can change it anytime..
            </p>

            <div className="price_per_night">
              <input
                inputMode="numeric"
                type="text"
                id="price_per_night"
                value={formValues.price_per_night}
                onChange={handleprice_per_nightChange}
                min="1000"
                max="1000000"
                placeholder="1000"
              />
              <span
                style={{
                  fontSize: "50px",
                  margin: "5px 0 0 -50px",
                  color: "black",
                }}
              >
                DZD
              </span>
            </div>
            <h2>Now, choose your payment method.</h2>
            <p
              style={{
                marginLeft: "50px",
                fontSize: "18px",
                color: "gray",
                marginTop: "-20px",
              }}
            >
              Here, you can choose how your customers make their payment.
            </p>
            <br />
            <div className="paymentMeth">
              <button
                type="button"
                onClick={() => {
                  handlepayment_type("ccp");
                  setIsCCP(true);
                  setIsEdahabia(false);
                }}
                className={
                  formValues.payment_type === "ccp"
                    ? "payment-button active"
                    : "payment-button"
                }
              >
                <p
                  style={{
                    fontSize: "18px",
                    color: "black",
                    marginTop: "22px",
                    marginLeft: "-10px",
                  }}
                >
                  CCP Transfer
                </p>
                <img src={virement1} alt="CCP Transfer" />
              </button>
              <br />
              <br />

              <button
                type="button"
                onClick={() => {
                  handlepayment_type("credit_card");
                  setIsEdahabia(true);
                  setIsCCP(false);
                }}
                className={
                  formValues.payment_type === "credit_card"
                    ? "payment-button active"
                    : "payment-button"
                }
              >
                <p
                  style={{
                    fontSize: "18px",
                    color: "black",
                    marginTop: "22px",
                    marginLeft: "-10px",
                  }}
                >
                  Credit card
                </p>
                <img src={carte1} alt="Credit card" />
              </button>
            </div>
            {/*//////////CCP/////////*/}
            <div>
              {isCCP && (
                <div
                  className="CCPForm"
                  style={{ marginTop: "100px", marginLeft: "260px" }}
                >
                  <h2 style={{ marginTop: "-20px", marginLeft: "160px" }}>
                    Pay with CCP
                  </h2>

                  <h4 style={{ marginLeft: "60px" }}>Your Name :</h4>
                  <input
                    style={{
                      width: "400px",
                      marginLeft: "55px",
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                    }}
                    type="text"
                    placeholder="Name"
                    required
                  />

                  <div style={{ display: "flex" }}>
                    <h4 style={{ marginLeft: "60px" }}>Account Number :</h4>
                    <h4 style={{ marginLeft: "110px" }}>Account key:</h4>
                  </div>
                  <div style={{ display: "inline-flex" }}>
                    <input
                      className="CardNumber"
                      style={{
                        width: "200px",
                        marginLeft: "55px",
                        padding: "9px",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                      }}
                      maxLength={10}
                      placeholder="Account"
                      title="Please enter only numbers"
                      required
                    />

                    <input
                      style={{
                        width: "150px",
                        marginLeft: "30px",
                        padding: "9px",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                      }}
                      maxLength={2}
                      placeholder="00"
                      required
                    />
                  </div>

                  <h4 style={{ marginLeft: "60px", marginTop: "10px" }}>
                    Your Address :
                  </h4>
                  <input
                    style={{
                      width: "400px",
                      marginLeft: "55px",
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                    }}
                    type="text"
                    placeholder="Address"
                    required
                  />
                  <br />
                  <br />
                  <div
                    className="disclaimer"
                    style={{
                      marginTop: "5px",
                      marginLeft: "170px",
                      color: "black",
                      display: "inline-flex",
                    }}
                  >
                    <FaLock /> &nbsp; Payments are secure and encrypted
                  </div>
                </div>
              )}
              {/*//////////EDAHABIA/////////*/}
              {isEdahabia && (
                <div
                  className="CreditCardForm"
                  style={{ marginTop: "100px", marginLeft: "260px" }}
                >
                  <h2 style={{ marginTop: "-20px", marginLeft: "160px" }}>
                    Pay with Edahabia
                  </h2>

                  <h4 style={{ marginLeft: "60px" }}>Your Name :</h4>
                  <input
                    style={{
                      width: "400px",
                      marginLeft: "55px",
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                    }}
                    type="text"
                    placeholder="Name"
                    required
                  />

                  <h4 style={{ marginLeft: "60px", marginTop: "5px" }}>
                    Card Number :
                  </h4>
                  <div style={{ display: "inline-flex" }}>
                    <input
                      className="CardNumber"
                      style={{
                        width: "400px",
                        marginLeft: "55px",
                        padding: "9px",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                      }}
                      value={formatCardNumber(cardNumber)}
                      onChange={(event) => setCardNumber(event.target.value)}
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      title="Please enter only numbers"
                      required
                    />
                    <FaCreditCard
                      style={{
                        marginLeft: "445px",
                        marginTop: "9px",
                        position: "absolute",
                      }}
                    />
                  </div>

                  <h4 style={{ marginLeft: "300px", marginTop: "5px" }}>
                    Expires:
                  </h4>
                  <input
                    type="text"
                    style={{
                      width: "150px",
                      marginLeft: "300px",
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                    }}
                    maxLength={5}
                    placeholder="00/00"
                    value={formatExpires(cardExpires)}
                    onChange={(event) => setCardExpires(event.target.value)}
                    required
                  />

                  <h4 style={{ marginLeft: "60px", marginTop: "-73px" }}>
                    CVC2/CVV2:
                  </h4>
                  <input
                    style={{
                      width: "150px",
                      marginLeft: "55px",
                      padding: "9px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                    }}
                    type="text"
                    maxLength={3}
                    placeholder="000"
                    required
                  />
                  <br />
                  <br />

                  <div
                    className="disclaimer"
                    style={{
                      marginTop: "5px",
                      marginLeft: "170px",
                      color: "black",
                      display: "inline-flex",
                    }}
                  >
                    <FaLock /> &nbsp; Payments are secure and encrypted
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="listing-submit-button"
              disabled={!isFormValid() || user.is_banned === 1}
              style={{
                backgroundColor: isFormValid()
                  ? "var(--primary-color)"
                  : "dark grey",
              }}
            >
              Publish
            </button>
          </form>
        </div>
      </div>{" "}
      <Footer/>
    </>
  );
}
