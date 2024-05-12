import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { SecondaryButton } from "./Buttons";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import logo from "../assets/logo-transparent-png.png";
export default function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav>
      {user ? (
        <>
          <Link to="/" className="link-decoration" style={{ width: "10%" }}>
            <div className="logo">
              <img
                src={logo}
                alt="RentALG"
                style={{
                  width: "100%",
                  height: "50%",
                  padding: "16px 0 0 20px ",
                }}
              />
            </div>
          </Link>
          <div className="right-side-nav2">
            <Link to="/host">
              <SecondaryButton
                text="Host your property"
                style={{
                  width: "160px",
                  marginTop: "-2px",
                  border: "0.5px solid",
                }}
              />
            </Link>
            <UserDropDown logout={logout} />
          </div>
        </>
      ) : (
        <>
          <Link to="/" className="link-decoration" style={{ width: "10%" }}>
            <div className="logo">
              <img
                src={logo}
                alt="RentALG"
                style={{
                  width: "100%",
                  height: "50%",
                  padding: "15px 0 0 20px ",
                }}
              />
            </div>
          </Link>
          <div className="right-side-nav">
            <Link to="/login">
              <SecondaryButton
                text="Login"
                style={{ border: "0.5px solid", marginTop: "10px " }}
              />
            </Link>
            <Link to="/signup">
              <SecondaryButton
                text="Sign up"
                style={{ border: "0.5px solid", marginTop: "10px  " }}
              />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
