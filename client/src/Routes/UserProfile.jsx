import { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import ReviewList from "../Components/ReviewsList";
import UserCard from "../Components/UserCard";
import UserProfileListings from "../Components/UserProfileListings";
import Footer from "../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [fullName, setFullName] = useState("");
  const [userListings, setUserListings] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isBanned, setIsBanned] = useState(null);
  const { id } = useParams();
  const { user } = useContext(UserContext);
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
        setIsBanned(userData.is_banned); // Use userData directly
        console.log(userData);
      } catch (error) {
        console.log("Error fetching user data", error);
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
        console.log("Error fetching listings", error);
      }
    };
    fetchUserListings();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/user/${id}`
        );
        if (!response.ok)
          throw new Error("Couldn't fetch reviews: Network error");
        const fetchedReviews = await response.json();
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  const removeListingFromState = (listingId) => {
    setUserListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== listingId)
    );
  };

  const banUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/ban/${id}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("Couldn't ban user: Network error");
      setIsBanned(true); // Set isBanned to true
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const unbanUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/unban/${id}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("Couldn't unban user: Network error");
      setIsBanned(false); // Set isBanned to false
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };
  const handleBan = () => {
    if (confirm("Are you sure you want to ban this user?")) {
      banUser();
    }
  };
  const handleUnban = () => {
    if (confirm("Are you sure you want to unban this user?")) {
      unbanUser();
    }
  };
  return (
    <>
      <Header />
      {user && user.is_banned && (
        <div className="bannedBanner">
          YOUR ACCOUNT HAS BEEN BANNED FROM RentALG, ALL FUNCTIONALITIES ARE
          DISABLED
        </div>
      )}
      <main className="user">
        <div>
          {profileData && (
            <UserCard
              profile_picture={profileData.profile_picture}
              name={fullName}
              phone={profileData.phone_number}
              profileId={id}
            />
          )}
          {user &&
            user.role === "admin" &&
            (isBanned ? (
              <button className="unban" onClick={handleUnban}>
                UNBAN
              </button>
            ) : (
              <button className="ban" onClick={handleBan}>
                BAN
              </button>
            ))}
          <div style={{ margin: "0 0 20px 25px", width: "450px" }}>
            {reviews && (
              <>
                <h3>What guests say about {fullName}</h3>

                <ReviewList reviews={reviews} />
              </>
            )}
          </div>
        </div>
        <div>
          <h2
            style={{
              marginTop: "90px",
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
              <p style={{ textAlign: "center" }}>
                This user has no listings...
              </p>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
