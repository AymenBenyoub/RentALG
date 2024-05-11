import { useEffect, useState } from "react";
import Header from "../Components/Header";
// import ReviewList from "../Components/ReviewsList";
import UserCard from "../Components/UserCard";
import UserProfileListings from "../Components/UserProfileListings";
import Footer from "../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [userListings, setUserListings] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Couldn't fetch user data: NETWORK ERROR");
        }
        const userData = await response.json();
        setProfileData(userData);
        setFullName(userData.first_name + " " + userData.last_name);
        console.log(userData);
      } catch (error) {
        console.log("error fetching user data", error);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/accommodations/host/${id}`
        );
        if (!response.ok) {
          throw new Error("Couldn't fetch user listings: NETWORK ERROR");
        }
        const userListings = await response.json();
        setUserListings(userListings);
      } catch (error) {
        console.log("error fetching listings ", error);
      }
    };
    fetchUserListings();
  }, [id]);
  const removeListingFromState = (listingId) => {
    setUserListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== listingId)
    );
  };

  return (
    <>
      <main className="user">
        <div style={{ marginLeft: "-30px" }}>
          {" "}
          <Header />
        </div>
        {profileData && (
          <UserCard
            profile_picture={profileData.profile_picture}
            name={fullName}
            phone={profileData.phone_number}
            profileId={id}
          />
        )}
        <h2
          style={{
            marginTop: "100px",
            fontSize: "30px",

            marginLeft: "15px",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          {fullName}&apos;s listings
        </h2>
        <div className="profile-listings-container">
          {userListings !== null && userListings.length === 0 ? (
            <p style={{ textAlign: "center" }}>This user has no listings</p>
          ) : userListings !== null ? (
            userListings.map((accommodation) => (
              <div
                key={accommodation.id}
                onClick={() => navigate(`/listings/${accommodation.id}`)}
              >
                <UserProfileListings
                  id={accommodation.id}
                  title={accommodation.title}
                  guests={accommodation.max_guests}
                  price={accommodation.price_per_night}
                  thumbnail={accommodation.pictures}
                  removeListingFromState={removeListingFromState}
                  profileId={id}
                />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>This user has no listings</p>
          )}
        </div>
        <br />
        <div style={{ marginTop: "0px", marginRight: "500px", width: "450px" }}>
          {/* <ReviewList /> */}
        </div>
      </main>
      <Footer />
    </>
  );
}
