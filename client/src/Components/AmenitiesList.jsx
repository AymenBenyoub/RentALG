import {
  FaWifi,
  FaUtensils,
  FaSnowflake,
  FaSwimmingPool,
  FaDumbbell,
  FaParking,
} from "react-icons/fa";

const amenities = [
  { icon: <FaWifi />, name: "Wifi" },
  { icon: <FaUtensils />, name: "Kitchen" },
  { icon: <FaSnowflake />, name: "Air Conditioning" },
  { icon: <FaSwimmingPool />, name: "Pool" },
  { icon: <FaDumbbell />, name: "Gym" },
  { icon: <FaParking />, name: "Parking" },
];

function AmenitiesList() {
  return (
    <div className="amenities-container">
      {amenities.map((amenity, index) => (
        <div key={index} className="amenity">
          {amenity.icon}
          <span>{amenity.name}</span>
        </div>
      ))}
    </div>
  );
}

export default AmenitiesList;
