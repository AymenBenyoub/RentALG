import HouseCard from "./HouseCard";
import CheckboxDropdown from "./CheckBoxDropDown";
import GuestInput from "./GuestInput";
import TextInput from "./TextInput";
export default function MainSection() {
  return (
    <>
      <div className="SearchSection">
        <p>Where would you like to go?</p>
        <TextInput />
        <CheckboxDropdown />
        <GuestInput />
      </div>
      <p
        style={{ fontFamily: "Secular One", fontSize: 20, marginLeft: "50px" }}
      >
        Explore top listings
      </p>
      <main>
        <HouseCard /> <HouseCard /> <HouseCard /> <HouseCard /> <HouseCard />{" "}
        <HouseCard /> <HouseCard />
      </main>
    </>
  );
}
