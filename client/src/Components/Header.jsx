import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { SecondaryButton } from "./Buttons";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav>
      {user ? (
        <>
          <Link to="/" className="link-decoration">
            <div className="logo">
              <p>RentALG</p>
            </div>
          </Link>
          <div className="right-side-nav2">
            <Link to="/host">
              <SecondaryButton
                text="Host your property"
                style={{ width: "160px", marginTop: "-2px" }}
              />
            </Link>
            <UserDropDown logout={logout} />
            {console.log(user)}
          </div>
        </>
      ) : (
        <>
          <Link to="/" className="link-decoration">
            <div className="logo">
              <p>RentALG</p>
            </div>
          </Link>
          <div className="right-side-nav">
            <Link to="/login">
              <SecondaryButton text="Login" />
            </Link>
            <Link to="/signup">
              <SecondaryButton text="Sign up" />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
