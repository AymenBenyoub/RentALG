import HouseCard from "./HouseCard";
import GuestInput from "./GuestInput";
import TextInput from "./TextInput";
import PriceFilter from "./PriceFilter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainSection() {
  const [accommodations, setAccommodations] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState("");
  const [guestFilter, setGuestFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

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

  const filteredAccommodations = accommodations.filter((accommodation) => {
    const matchDestination =
      destinationFilter === "" ||
      accommodation.title
        .toLowerCase()
        .includes(destinationFilter.toLowerCase()) ||
      accommodation.location
        .toLowerCase()
        .includes(destinationFilter.toLowerCase());

    const matchGuests =
      guestFilter === "" || accommodation.max_guests >= guestFilter;

    const matchPrice =
      (priceRange.min === "" ||
        accommodation.price_per_night >= priceRange.min) &&
      (priceRange.max === "" ||
        accommodation.price_per_night <= priceRange.max);

    return matchDestination && matchGuests && matchPrice;
  });
  return (
    <>
      <div className="SearchSection">
        <p>Filters:</p>
        <TextInput onChange={handleDestinationChange} />
        <GuestInput onChange={handleGuestChange} />
        <PriceFilter onChange={handlePriceChange} />
      </div>
      <p
        style={{ fontFamily: "Secular One", fontSize: 20, marginLeft: "50px" }}
      >
        Explore top listings
      </p>
      <main>
        {filteredAccommodations.length === 0 ? (
          <p style={{ textAlign: "center" }}>No results found</p>
        ) : (
          filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              onClick={() => navigate(`/listings/${accommodation.id}`)}
            >
              <HouseCard
                title={accommodation.title}
                guests={accommodation.max_guests}
                price={accommodation.price_per_night}
                thumbnail={accommodation.pictures}
              />
            </div>
          ))
        )}
      </main>
    </>
  );
}
