import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ImageCarousel from "../Components/ImageCarousel";
import mus from "../Components/pics/mus.jpg";
import horse from "../Components/pics/horse.jpg";
import xd from "../Components/pics/xd.jpg";
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
            <h3>General Information</h3>
          </div>
          <div className="bill"></div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}

export default listingDetails;
