import { PrimaryButton, SecondaryButton } from "../Components/Buttons";

function Home() {
  return (
    <>
      <nav>
        <div className="logo">
          <p>RentALG</p>
        </div>

        <div className="right-side-nav">
          <SecondaryButton text="Login" />
          <PrimaryButton text="Sign up" />
        </div>
      </nav>
    </>
  );
}

export default Home;
