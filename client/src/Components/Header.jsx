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
        <SecondaryButton text="Login" />
        <PrimaryButton text="Sign up" />
      </div>
    </nav>
  );
}
