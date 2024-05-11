/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import { UserContext } from "../context/UserContext";

function UserDropDown({ logout }) {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(UserContext);

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
          <ul>
            <li>
              <Link to={"/profile/" + user.id} className="link-decoration">
                Profile
              </Link>
            </li>
            <li>
              <Link className="link-decoration">My bookings</Link>
            </li>

            <li>
              <Link className="link-decoration" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropDown;
