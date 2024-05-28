/* eslint-disable react/prop-types */
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
const amenitiesData = [
  { icon: <FaWifi />, name: "wifi", displayName: "Wifi" },
  { icon: <FaUtensils />, name: "kitchen", displayName: "Kitchen" },
  { icon: <PiTelevisionSimpleBold />, name: "tv", displayName: "TV" },
  { icon: <FaSwimmingPool />, name: "pool", displayName: "Pool" },
  { icon: <FaDumbbell />, name: "gym", displayName: "Gym" },
  { icon: <FaParking />, name: "garage", displayName: "Garage" },
  { icon: <GiBathtub />, name: "bathtub", displayName: "Bathtub" },
  { icon: <MdOutdoorGrill />, name: "bbqGrill", displayName: "BBQ grill" },
  { icon: <GiWaveSurfer />, name: "beachView", displayName: "Beach view" },
];

function AmenitiesList({ amenities }) {
  return (
    <div className="amenities-container">
      {amenities.map((amenityName, index) => {
        const amenity = amenitiesData.find((item) => item.name === amenityName);
        if (!amenity) return null;
        return (
          <div key={index} className="amenity">
            {amenity.icon}
            <span>{amenity.displayName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default AmenitiesList;
