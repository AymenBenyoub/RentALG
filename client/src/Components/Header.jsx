import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { SecondaryButton } from "./Buttons";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
// import { PrimaryButton, SecondaryButton } from "../Components/Buttons";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <nav>
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
        <UserDropDown />
      </div>

      {/* <div className="right-side-nav">
        <Link to="/login">
          <SecondaryButton text="Login" />
        </Link>
        <Link to="/signup">
          <PrimaryButton text="Sign up" />
        </Link>
      </div> */}
    </nav>
  );
}
