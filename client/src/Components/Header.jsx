import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../Components/Buttons";

export default function Header() {
  return (
    <nav>
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
          <PrimaryButton text="Sign up" />
        </Link>
      </div>
    </nav>
  );
}
