import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ImageCarousel from "../Components/ImageCarousel";
import { useParams } from "react-router-dom";

import BookingBill from "../Components/BookingBill";
import { FaLocationDot } from "react-icons/fa6";
import AmenitiesList from "../Components/AmenitiesList";
import Avatar from "../Components/Avatar";
import { Link } from "react-router-dom";
import ReviewsList from "../Components/ReviewsList";
import { useEffect, useState } from "react";
function ListingDetails() {
  const [listingInfo, setListingInfo] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
        console.log(accommodation);
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
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
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
            <div className="location">
              <h3>Location</h3>
              <FaLocationDot /> {listingInfo.location}
            </div>
            <div className="listing-host-avatar">
              <Avatar size={50} />
              <Link to="" className="link-decoration">
                <span>Hosted by mohammed</span>
              </Link>
            </div>
            <div>
              <h3>Reviews</h3>
              {reviews && reviews.length > 0 ? (
                <ReviewsList reviews={reviews} />
              ) : (
                <span className="no-reviews">No reviews</span>
              )}
            </div>
          </div>
          <div className="bill">
            <BookingBill price={listingInfo.price_per_night} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListingDetails;
