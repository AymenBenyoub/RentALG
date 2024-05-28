import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ImageCarousel from "../Components/ImageCarousel";
import { useParams } from "react-router-dom";
import Reporting from "../Components/Reporting";
import Review from "../Components/Review";
import BookingBill from "../Components/BookingBill";
import { FaLocationDot } from "react-icons/fa6";
import AmenitiesList from "../Components/AmenitiesList";
import Avatar from "../Components/Avatar";
import { Link } from "react-router-dom";
import ReviewsList from "../Components/ReviewsList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import AdminHeader from '../Components/AdminHeader';
// import { UserContext } from "../context/UserContext";
function ListingDetails() {
  const [listingInfo, setListingInfo] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [hasBooked, setHasBooked] = useState(null);
  const { id } = useParams();
  const { user } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchAccommodationById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/accommodations/${id}`
        );
        if (!response.ok)
          throw new Error("Couldn't fetch accommodation info: Network error: ");
        const accommodation = await response.json();

        setListingInfo(accommodation);

        setLoading(false);
      } catch (error) {
        console.error("Couldn't fetch lisiting info:", error);
      }
    };
    fetchAccommodationById();
  }, [id]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/accommodation/${id}`
        );
        if (!response.ok)
          throw new Error("Couldn't fetch reviews: Network error");
        const fetchedReviews = await response.json();

        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Couldn't fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);
  useEffect(() => {
    const fetchOwner = async () => {
      if (listingInfo) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/${listingInfo.host_id}`
          );
          if (!response.ok)
            throw new Error("Couldn't fetch owner: Network error");
          const fetchedOwner = await response.json();
          setOwner(fetchedOwner);
        } catch (error) {
          console.error("Couldn't fetch owner:", error);
        }
      }
    };
    fetchOwner();
  }, [listingInfo, id]);
  useEffect(() => {
    const hasBooked = async () => {
      if (listingInfo && user) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/reservations/user/${user.id}/${id}`
          );
          if (!response.ok)
            throw new Error("Couldn't check if user has booked: Network error");
          const has_booked = await response.json();
          setHasBooked(has_booked);
        } catch (error) {
          console.error("Couldn't check if user has booked:", error);
        }
      }
    };

    hasBooked();
  }, [listingInfo, id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && user.is_banned == 1 && (
        <div className="bannedBanner">
          YOUR ACCOUNT HAS BEEN BANNED FROM RentALG, ALL FUNCTIONALITIES ARE
          DISABLED
        </div>
      )}
      {user && user.role === "admin" ? ( <AdminHeader/> ) : ( <Header/>) }
      <div className="listing-details-page">
        <div className="listing-details-page-images">
          <h2>{listingInfo.title}</h2>
          <ImageCarousel images={listingInfo.pictures} />
        </div>
        <div className="listing-details-container">
          <div className="details">
            <div className="description">
              <h3>General Information</h3>
              <p>{listingInfo.description}</p>
            </div>
            <div className="amenties">
              <h3>What this place offers</h3>
              <AmenitiesList amenities={listingInfo.amenities} />
            </div>
            <div className="locationDetails">
              <h3>Location</h3>
              <FaLocationDot /> {listingInfo.location}
            </div>
            <div className="listing-host-avatar">
              {owner && (
                <>
                  <Avatar size={50} image={owner.profile_picture} />
                  <Link
                    to={"/profile/" + listingInfo.host_id}
                    className="link-decoration"
                  >
                    <span>
                      Hosted by {owner.first_name + " " + owner.last_name}
                    </span>
                  </Link>
                  <Reporting
                    accommodationId={id}
                    host_id={listingInfo.host_id}
                  />
                </>
              )}
            </div>
            <div>
              <h3>Reviews</h3>
              {!hasBooked ||
                (hasBooked.length !== 0 && (
                  <Review accommodationId={id} host_id={listingInfo.host_id} />
                ))}
              {user && reviews && reviews.length > 0 ? (
                <ReviewsList reviews={reviews} />
              ) : (
                <span className="no-reviews">No reviews</span>
              )}
            </div>
          </div>
          <div className="bill">
            <BookingBill
              price={listingInfo.price_per_night}
              payment={listingInfo.payment_type}
              listing={listingInfo.id}
              host_id={listingInfo.host_id}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListingDetails;
