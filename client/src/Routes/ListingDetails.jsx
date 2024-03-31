import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ImageCarousel from "../Components/ImageCarousel";
import mus from "../Components/pics/mus.jpg";
import horse from "../Components/pics/horse.jpg";
import xd from "../Components/pics/xd.jpg";
import BookingBill from "../Components/BookingBill";
import { FaLocationDot } from "react-icons/fa6";
import AmenitiesList from "../Components/AmenitiesList";
import Avatar from "../Components/Avatar";
import { Link } from "react-router-dom";
import ReviewsList from "../Components/ReviewsList";
function listingDetails() {
  const images = [mus, horse, xd];
  return (
    <>
      <Header />
      <div className="listing-details-page">
        <div className="listing-details-page-images">
          <h2>Appartement in ???</h2>
          <ImageCarousel images={images} />
        </div>
        <div className="listing-details-container">
          <div className="details">
            <div className="description">
              <h3>General Information</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque alias dolore aliquid nemo accusamus. Maiores porro
                repudiandae molestiae quia minima. Maxime quo repudiandae ea
                blanditiis provident repellendus accusamus sint veritatis. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
                praesentium magnam distinctio, blanditiis officia ea delectus
                autem voluptates doloribus atque ad ullam nihil corrupti labore
                ipsam obcaecati hic, animi nisi.
              </p>
            </div>
            <div className="amenties">
              <h3>What this place offers</h3>
              <AmenitiesList />
            </div>
            <div className="location">
              <h3>Location</h3>
              <FaLocationDot /> place, in place place23
            </div>
            <div className="listing-host-avatar">
              <Avatar size={50} />
              <Link to="" className="link-decoration">
                <span>Hosted by DUMBASS</span>
              </Link>
            </div>
            <div>
              {" "}
              <h3>Reviews</h3>
              <ReviewsList />
            </div>
          </div>
          <div className="bill">
            <BookingBill />
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}

export default listingDetails;
