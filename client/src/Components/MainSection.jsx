import HouseCard from "./HouseCard";
import CheckboxDropdown from "./CheckBoxDropDown";
import GuestInput from "./GuestInput";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MainSection() {
  const [accommodations, setAccommodations] = useState([]);
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
        console.error("failed to fetch accommodations", error);
      }
    };
    fetchAccommodations();
  }, []);

  return (
    <>
      <div className="SearchSection">
        <p>Where would you like to go?</p>
        <TextInput />
        <CheckboxDropdown />
        <GuestInput />
      </div>
      <p
        style={{ fontFamily: "Secular One", fontSize: 20, marginLeft: "50px" }}
      >
        Explore top listings
      </p>
      <main>
        {accommodations.map((accommodation) => (
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
        ))}
      </main>
    </>
  );
}
