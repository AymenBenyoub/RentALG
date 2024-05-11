/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export default function UserProfileListings({
  id,
  thumbnail,
  title,
  guests,
  price,
  removeListingFromState,

  profileId,
}) {
  const parsedThumbnail = thumbnail ? JSON.parse(thumbnail)[0] : null;
  const { user } = useContext(UserContext);
  const handleRemove = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:3000/api/accommodations/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok)
        throw new Error("ERROR DELETING LISTING:NETWORK ERROR\n ");

      console.log("listing deleted");
      removeListingFromState(id);
    } catch (error) {
      console.error("error deleting listing: " + error);
    }
  };

  return (
    <div className="profile-listings">
      <Link className="link-user2">
        <img
          src={`http://localhost:3000/${parsedThumbnail}`}
          className="profileList-image"
        />
        <div className="profileList-details">
          <h2 className="profileList-title">{title}</h2>
        </div>
      </Link>

      {user && parseInt(user?.id) === parseInt(profileId) ? (
        <button className="removeListing" onClick={handleRemove}>
          <div className="removeListing-container">Remove</div>
        </button>
      ) : (
        <div
          className="house-details"
          style={{
            padding: "0 0 0 20px",
            margin: "-15px 0 0 0",
          }}
        >
          <p className="house-location">{guests} guests</p>
          <p className="house-price">{price} DA</p>
        </div>
      )}
    </div>
  );
}
