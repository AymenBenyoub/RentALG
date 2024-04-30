import { useState, useRef } from "react";
import "../styles/HostForm.css"; // Import CSS file for styling
import houseIcon from "../assets/house_icon.jpeg";
import sharedroom_Icon from "../assets/sharedroom_icon.png";
import roomIcon from "../assets/room_icon.jpeg";
import virement1 from "../assets/virement1.jpeg";
import carte1 from "../assets/carte1.jpeg";

function Host() {
  const [formData, setFormData] = useState({
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

  const [numGuests, setNumGuests] = useState(1);

  const incrementGuests = () => {
    setFormData((prevData) => ({
      ...prevData,
      max_guests: prevData.max_guests + 1,
    }));
  };

  const decrementGuests = () => {
    if (formData.max_guests > 1) {
      setFormData((prevData) => ({
        ...prevData,
        max_guests: prevData.max_guests - 1,
      }));
    }
  };

  const [selectedpictures, setSelectedpictures] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedpictures(files);
    setFormData((prevData) => ({
      ...prevData,
      selectedpictures: files,
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
    setFormData({ ...formData, price_per_night: newValue });
  };

  const handleaccommodation_typeChange = (type) => {
    setFormData({ ...formData, accommodation_type: type });
  };

  const toggleFeature = (feature) => {
    setFormData((prevData) => ({
      ...prevData,
      amenities: {
        ...prevData.amenities,
        [feature]: !prevData.amenities[feature],
      },
    }));
  };

  const handlepayment_type = (method) => {
    setFormData({ ...formData, payment_type: method });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/accommodations/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);
      if (!response.ok) {
        throw new Error("Failed to create accommodation");
      }
      const data = await response.json();
      console.log("Accommodation created successfully:", data);
      // Reset form data
      setFormData({
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
      setSelectedpictures([]);
    } catch (error) {
      console.error("Error creating accommodation:", error);
    }
  };

  const isFormValid = () => {
    return (
      formData.accommodation_type &&
      formData.location &&
      formData.max_guests &&
      formData.title &&
      formData.description &&
      Object.values(formData.amenities).some((value) => value) &&
      selectedpictures.length > 0 &&
      formData.price_per_night &&
      formData.payment_type
    );
  };
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
              formData.accommodation_type === "House" ? "active" : ""
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
              formData.accommodation_type === "Shared room" ? "active" : ""
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
              formData.accommodation_type === "Room" ? "active" : ""
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
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
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
              {numGuests}
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
              checked={formData.amenities.wifi}
              onChange={() => toggleFeature("wifi")}
            />
            <p>Wifi</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.kitchen}
              onChange={() => toggleFeature("kitchen")}
            />
            <p>Kitchen</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.gym}
              onChange={() => toggleFeature("gym")}
            />
            <p>Gym</p>
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.bbqGrill}
              onChange={() => toggleFeature("bbqGrill")}
            />
            <p>BBQ Grill</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.bathtub}
              onChange={() => toggleFeature("bathtub")}
            />
            <p>Bath tub</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.tv}
              onChange={() => toggleFeature("tv")}
            />
            <p>TV</p>
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.garage}
              onChange={() => toggleFeature("garage")}
            />
            <p>Garage</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.pool}
              onChange={() => toggleFeature("pool")}
            />
            <p>Pool</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.amenities.beachView}
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
          {selectedpictures.map((file, index) => (
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
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
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
            value={formData.price_per_night}
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
              formData.payment_type === "paypal"
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
              formData.payment_type === "credit_card"
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
          className="submit-btn"
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
