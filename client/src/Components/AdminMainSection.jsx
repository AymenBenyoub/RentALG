
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
import { ImCheckboxChecked } from "react-icons/im";
import { GrCheckbox } from "react-icons/gr";

export default function MainSection() {
  const [accommodations, setAccommodations] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState("");
  const [guestFilter, setGuestFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // Initialize typeFilter state
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [isActive, setIsActive] = useState({
    wifi: false,
    kitchen: false,
    tv: false,
    pool: false,
    gym: false,
    garage: false,
    bathtub: false,
    bbqGrill: false,
    beachView: false,
  });


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
    
    setIsActive(prevState => ({
      ...prevState,
      [amenity]: !prevState[amenity],
    }));
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
            <button onClick={() => handleAmenityChange("wifi")} style={{ backgroundColor: isActive.wifi ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            {isActive.wifi ?  <ImCheckboxChecked />: <GrCheckbox />} <FaWifi />
            </button>
          </div>
          <div title="Kitchen">
            <button onClick={() => handleAmenityChange("kitchen")} style={{ backgroundColor: isActive.kitchen ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            {isActive.kitchen ?  <ImCheckboxChecked />: <GrCheckbox />}  <FaUtensils />
            </button>
          </div>
          <div title="TV">
            <button onClick={() => handleAmenityChange("tv")} style={{ backgroundColor: isActive.tv ? 'var(--primary-color)' : 'var(--secondary-color)'}}>
            {isActive.tv?  <ImCheckboxChecked />: <GrCheckbox />} <PiTelevisionSimpleBold />
            </button>
          </div>
          <div title="Pool">
            <button onClick={() => handleAmenityChange("pool")} style={{ backgroundColor: isActive.pool ? 'var(--primary-color)' : 'var(--secondary-color)'}}>
            {isActive.pool ?  <ImCheckboxChecked />: <GrCheckbox />} <FaSwimmingPool />
            </button>
          </div>
          <div title="Gym">
            <button onClick={() => handleAmenityChange("gym")} style={{ backgroundColor: isActive.gym ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            {isActive.gym ?  <ImCheckboxChecked />: <GrCheckbox />} <FaDumbbell />
            </button>
          </div>
          <div title="Garage">
            <button onClick={() => handleAmenityChange("garage")} style={{ backgroundColor: isActive.garage ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            {isActive.garage?  <ImCheckboxChecked />: <GrCheckbox />} <FaParking />
            </button>
          </div>
          <div title="Bathtub">
            <button onClick={() => handleAmenityChange("bathtub")} style={{ backgroundColor: isActive.bathtub ? 'var(--primary-color)' : 'var(--secondary-color)'}}>
            {isActive.bathtub ?  <ImCheckboxChecked />: <GrCheckbox />}  <GiBathtub />
            </button>
          </div>
          <div title="BBQ Grill">
            <button onClick={() => handleAmenityChange("bbqGrill")} style={{ backgroundColor: isActive.bbqGrill ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            {isActive.bbqGrill ?  <ImCheckboxChecked />: <GrCheckbox />}  <MdOutdoorGrill />
            </button>
          </div>
          <div title="Beach view">
            <button onClick={() => handleAmenityChange("beachView")} style={{ backgroundColor: isActive.beachView ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            {isActive.beachView ?  <ImCheckboxChecked />: <GrCheckbox />}  <GiWaveSurfer />
            </button>
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
