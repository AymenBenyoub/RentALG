/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { TbHomeHeart } from "react-icons/tb";
import Avatar from "./Avatar";
import { UserContext } from "../context/UserContext";
import { TbHomeRibbon } from "react-icons/tb";

function UserDropDown() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useContext(UserContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="dropdown-menu-container" onClick={toggleMenu}>
      <div className="dropdown-menu-icon">
        <FaBars />
      </div>
      <div className="user-avatar">
        {user.profile_picture && (
          <Avatar
            key={user.profile_picture}
            size={28}
            image={user.profile_picture}
          />
        )}
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          <ul style={{ marginBottom: "5px" }}>
            <li>
              <Link
                to={"/profile/" + user.id}
                className="link-decoration"
                style={{ color: "#4e4e4e" }}
              >
                <div>Profile</div>
                <LuUser2 />
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className="link-decoration"
                style={{ color: "#4e4e4e" }}
              >
                <div> My bookings</div>
                <TbHomeHeart />
              </Link>
            </li>
            <li>
              <Link
                to="/UpcomingGuests"
                className="link-decoration"
                style={{ color: "#4e4e4e" }}
              >
                <div> Upcoming guests</div>
                <TbHomeRibbon />
              </Link>
            </li>

            <li style={{ borderBottom: "0px", marginBottom: "5px" }}>
              <Link
                className="link-decoration"
                onClick={() => {
                  logout();
                  window.location.replace("/");
                }}
                style={{ color: "red" }}
              >
                <div> Logout</div>
                <IoLogOutOutline />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropDown;
