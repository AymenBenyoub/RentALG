/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import certified from "../assets/certified.jpg";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const UserCard = ({ profile_picture, name, phone, profileId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("jwtToken");
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleProfilePictureChange = async (event) => {
    const profilePic = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/profilepic/${user.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Profile picture updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update profile picture:NETWORK ERROR");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="profile">
      <div className="user-container">
        <div
          className="cart_user"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {user.id && parseInt(user.id) === parseInt(profileId) ? (
            <div
              className="profile-picture-container"
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={`http://localhost:3000/${profile_picture}`}
                alt="Profile"
              />
              <div
                className="change-profile-picture"
                style={{
                  position: "absolute",
                  top: "15px",
                  opacity: isHovering ? 0.8 : 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  margin: "100px 20px 0 50px",
                  width: "25px",
                  padding: "5px",
                  borderRadius: "50%",
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-picture-input"
                  name="profilePic"
                  onChange={handleProfilePictureChange}
                />
                <label
                  htmlFor="profile-picture-input"
                  style={{ cursor: "pointer", margin: "0" }}
                >
                  <FaCamera color="white" size={16} />
                </label>
              </div>
            </div>
          ) : (
            <img
              src={`http://localhost:3000/${profile_picture}`}
              alt="Profile"
            />
          )}
          <img
            className="certified"
            style={{
              height: "40px",
              width: "40px",
              rotate: "-moz-initial",
              left: "-100px",
              top: "50px",
            }}
            src={certified}
            alt="Certified"
          />
          <p className="name">Name: {name}</p>
          <hr style={{ width: "50%", marginLeft: "170px" }} />
          <p className="pn">Phone: {phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
