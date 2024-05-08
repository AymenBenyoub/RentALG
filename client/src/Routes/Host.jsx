import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/HostForm.css";
import houseIcon from "../assets/house_icon.jpeg";
import sharedroom_Icon from "../assets/sharedroom_icon.png";
import roomIcon from "../assets/room_icon.jpeg";
import virement1 from "../assets/virement1.jpeg";
import carte1 from "../assets/carte1.jpeg";
import { UserContext } from "../context/UserContext";

function Host() {
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
  const guestInputRef = useRef(null); // Reference to the max_guests input field

  const incrementGuests = (e) => {
    e.preventDefault(); // Prevent default form submission
    setformValues((prevData) => ({
      ...prevData,
      max_guests: prevData.max_guests + 1,
    }));
    setmax_guests((prevValue) => prevValue + 1);
    guestInputRef.current.focus(); // Focus on the max_guests input field
  };

  const decrementGuests = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (formValues.max_guests > 1) {
      setformValues((prevData) => ({
        ...prevData,
        max_guests: prevData.max_guests - 1,
      }));
      setmax_guests((prevValue) => prevValue - 1);
    }
    guestInputRef.current.focus(); // Focus on the max_guests input field
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
      // const headers = {
      //   "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      // };
      const response = await fetch(
        "http://localhost:3000/api/accommodations/create",
        {
          method: "POST",
          // headers: headers,
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
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <div className="first_step">
        <h2>First step: Tell us about your place.</h2>
        <p>
          In this step, we&apos;ll ask you which type of property you have and
          if
          <br />
          guests will book the entire place or just a room. Then let us know{" "}
          <br />
          the location and how many guests can stay.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="button-container">
          <h2>What type of place will guests have?</h2>
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
              formValues.accommodation_type === "Shared room" ? "active" : ""
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
        <br />
        <h2>Where&apos;s your place located ?</h2>
        <p
          style={{
            marginLeft: "150px",
            fontSize: "18px",
            color: "black",
            marginTop: "-20px",
            fontWeight: "bold",
          }}
        >
          Paste your location link here:
        </p>
        <div>
          <input
            style={{
              backgroundColor: "white",
              padding: "0.5rem",
              width: "250px",
              textAlign: "center",
              margin: "0 0.5rem",
              borderRadius: "8px",
              color: "black",
              marginLeft: "400px",
            }}
            type="text"
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
          <p style={{ marginLeft: "-30px", fontSize: "18px", color: "black" }}>
            Max Guests:
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="decguests" onClick={decrementGuests} required>
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
        <div className="second_step">
          <h2>Second step: Make your place stand out.</h2>
          <p
            style={{
              marginLeft: "50px",
              fontSize: "18px",
              color: "black",
              marginTop: "-20px",
            }}
          >
            In this step, you&apos;ll add some of the amenities your place
            offers, some pictures. <br />
            Then, you&apos;ll create a title and description.
          </p>
        </div>
        <br />
        <h2 style={{ margin: "-10px", marginLeft: "50px" }}>
          What your place has to offer ?
        </h2>
        <br />
        <br />
        <div className="amenities">
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.wifi}
              onChange={() => toggleFeature("wifi")}
            />
            <p>Wifi</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.kitchen}
              onChange={() => toggleFeature("kitchen")}
            />
            <p>Kitchen</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.gym}
              onChange={() => toggleFeature("gym")}
            />
            <p>Gym</p>
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.bbqGrill}
              onChange={() => toggleFeature("bbqGrill")}
            />
            <p>BBQ Grill</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.bathtub}
              onChange={() => toggleFeature("bathtub")}
            />
            <p>Bath tub</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.tv}
              onChange={() => toggleFeature("tv")}
            />
            <p>TV</p>
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.garage}
              onChange={() => toggleFeature("garage")}
            />
            <p>Garage</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.pool}
              onChange={() => toggleFeature("pool")}
            />
            <p>Pool</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formValues.amenities.beachView}
              onChange={() => toggleFeature("beachView")}
            />
            <p>Beach view</p>
          </label>
        </div>
        <br />
        <h2>Add some pictures of your house.</h2>
        <br />
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
              >
                {file.name}
              </p>
            </div>
          ))}
        </div>
        <br />
        <h2>Now, let&apos;s give your house a title.</h2>
        <p
          style={{
            marginLeft: "50px",
            fontSize: "18px",
            color: "gray",
            marginTop: "-20px",
          }}
        >
          Short titles work best. Have fun with it—you can always change it
          later.
        </p>
        <textarea
          rows={5}
          style={{ marginLeft: "100px", height: "150px" }}
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
            fontSize: "18px",
            color: "gray",
            marginTop: "-20px",
          }}
        >
          Share what makes your place special..
        </p>
        <textarea
          className="text2"
          rows={5}
          style={{ marginLeft: "100px", height: "250px" }}
          value={formValues.description}
          onChange={(e) =>
            setformValues({ ...formValues, description: e.target.value })
          }
          required
        />
        <br />
        <div className="second_step">
          <h2>Third step: Finish up and publish.</h2>
          <p
            style={{
              marginLeft: "50px",
              fontSize: "18px",
              color: "black",
              marginTop: "-20px",
            }}
          >
            Finally, you&apos;ll set up pricing, choose payment methods, and
            publish your listing.
          </p>
        </div>
        <br />
        <h2>Now, set your price.</h2>
        <p
          style={{
            marginLeft: "50px",
            fontSize: "18px",
            color: "gray",
            marginTop: "-20px",
          }}
        >
          You can change it anytime..
        </p>
        <br />
        <div className="price_per_night">
          <input
            inputMode="numeric"
            type="text"
            id="price_per_night"
            value={formValues.price_per_night}
            onChange={handleprice_per_nightChange}
            min="1000"
            max="1000000"
            placeholder="3000"
          />
          <span
            style={{
              fontSize: "70px",
              marginTop: "50px",
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
            onClick={() => handlepayment_type("ccp")}
            className={
              formValues.payment_type === "paypal"
                ? "payment-button active"
                : "payment-button"
            }
          >
            <p
              style={{
                fontSize: "18px",
                color: "black",
                marginTop: "22px",
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
            onClick={() => handlepayment_type("credit_card")}
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
              }}
            >
              Credit card
            </p>
            <img src={carte1} alt="Credit card" />
          </button>
        </div>
        <br />
        <br />
        <button
          type="submit"
          className="listing-submit-button"
          disabled={!isFormValid()}
          style={{
            backgroundColor: isFormValid() ? "#007bff" : "#6c757d",
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default Host;
