
import AdminHouseCard from "./AdminHouseCard";
import GuestInput from "./GuestInput";
import TextInput from "./TextInput";
import PriceFilter from "./PriceFilter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiBuildingHouse } from "react-icons/bi";
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

export default function MainSection() {
  const [accommodations, setAccommodations] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState("");
  const [guestFilter, setGuestFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // Initialize typeFilter state
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/accommodations"
        );
        if (!response.ok) throw new Error("Couldn't fetch accommodations");
        const accommodationsData = await response.json();
        setAccommodations(accommodationsData);
      } catch (error) {
        console.error("Failed to fetch accommodations", error);
      }
    };
    fetchAccommodations();
  }, []);

  const handleDestinationChange = (value) => {
    const stringValue = String(value);
    setDestinationFilter(stringValue);
  };

  const handleGuestChange = (value) => {
    const intValue = parseInt(value);
    setGuestFilter(isNaN(intValue) ? "" : intValue);
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    const parsedMinPrice = minPrice === "" ? "" : parseFloat(minPrice);
    const parsedMaxPrice = maxPrice === "" ? "" : parseFloat(maxPrice);
    setPriceRange({ min: parsedMinPrice, max: parsedMaxPrice });
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value); // Update typeFilter state when the select value changes
  };

  const filteredAccommodations = accommodations.filter((accommodation) => {
    const matchDestination =
      destinationFilter === "" ||
      accommodation.title.toLowerCase().includes(destinationFilter.toLowerCase()) ||
      accommodation.location.toLowerCase().includes(destinationFilter.toLowerCase());
    const matchGuests = guestFilter === "" || accommodation.max_guests >= guestFilter;
    const matchType = typeFilter === "all" || accommodation.accommodation_type === typeFilter; // Check if accommodation type matches
    const matchPrice =
      (priceRange.min === "" || accommodation.price_per_night >= priceRange.min) &&
      (priceRange.max === "" || accommodation.price_per_night <= priceRange.max);
    const matchAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => accommodation.amenities.includes(amenity));
    return matchDestination && matchGuests && matchPrice && matchAmenities && matchType;
  });

  const removeAccommodation = (listingId) => {
    setAccommodations((prevAccommodations) =>
      prevAccommodations.filter((accommodation) => accommodation.id !== listingId)
    );
  };

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updatedAmenities);
  };

  return (
    <>
    <div className="filters-bg">
      <div className="SearchSection">
        <p>Filters:</p>
        <TextInput onChange={handleDestinationChange} />
        <div className="accommondationType-input" >
          <select onChange={(e) => handleTypeChange(e.target.value)}>
            <option value="all">All listings type</option>
            <option value="shared room">Shared room</option>
            <option value="house">House</option>
            <option value="room">Room</option>
          </select>
          <BiBuildingHouse />
        </div>
        <GuestInput onChange={handleGuestChange} />
        <PriceFilter onChange={handlePriceChange} />
      </div>
      <div className="SearchAmenities">
      <div title="Wifi"> 
          <input type="checkbox" onChange={() => handleAmenityChange("wifi")} />
          <FaWifi />
        </div>
        <div title="Kitchen">
          <input type="checkbox" onChange={() => handleAmenityChange("utensils")} />
          <FaUtensils />
        </div>
        <div title="TV">
          <input type="checkbox" onChange={() => handleAmenityChange("tv")} />
          <PiTelevisionSimpleBold />
        </div>
        <div title="Pool">
          <input type="checkbox" onChange={() => handleAmenityChange("pool")} />
          <FaSwimmingPool />
        </div>
        <div title="Gym">
          <input type="checkbox" onChange={() => handleAmenityChange("gym")} />
          <FaDumbbell />
        </div>
        <div title="Garage">
          <input type="checkbox" onChange={() => handleAmenityChange("parking")} />
          <FaParking />
        </div>
        <div title="Bathtub">
          <input type="checkbox" onChange={() => handleAmenityChange("bathtub")} />
          <GiBathtub />
        </div>
        <div title="BBQ Grill">
          <input type="checkbox" onChange={() => handleAmenityChange("grill")} />
          <MdOutdoorGrill />
        </div>
        <div title="Beach view">
          <input type="checkbox" onChange={() => handleAmenityChange("surfing")} />
          <GiWaveSurfer />
        </div>
      </div>
      </div>
      <p style={{ fontFamily: "Secular One", fontSize: 20, marginLeft: "50px" }}>
        All Listings
      </p>
      <main>
        {filteredAccommodations.length === 0 ? (
          <p style={{ textAlign: "center" }}>No results found</p>
        ) : (
          filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              onClick={() => navigate(`/listings/${accommodation.id}`)}
              style={{ width: "min-content" }}
            >
              <AdminHouseCard
                id={accommodation.id}
                title={accommodation.title}
                guests={accommodation.max_guests}
                price={accommodation.price_per_night}
                thumbnail={accommodation.pictures}
                removeListingFromState={removeAccommodation}
              />
            </div>
          ))
        )}
      </main>
    </>
  );
}
