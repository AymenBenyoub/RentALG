/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
function UserDropDown({ logout }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };

  return (
    <div className="dropdown-menu-container" onClick={toggleMenu}>
      <div className="dropdown-menu-icon">
        <FaBars />
      </div>
      <div className="user-avatar">
        <Avatar size={28} />
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="" className="link-decoration">
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
