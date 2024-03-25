import { PrimaryButton, SecondaryButton } from "../Components/Buttons";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <p>RentALG</p>
          </div>
        </Link>

        <div className="right-side-nav">
          <SecondaryButton text="Login" />
          <PrimaryButton text="Sign up" />
        </div>
      </nav>
      <div className="SearchSection">
        <p>Where would you like to go?</p>
        <input type="text" placeholder="Search destinations" />
      </div>
      <p
        style={{ fontFamily: "Secular One", fontSize: 20, marginLeft: "50px" }}
      >
        Explore top listings
      </p>
      <main> 😀😀😀😀</main>
    </>
  );
}

export default Home;
