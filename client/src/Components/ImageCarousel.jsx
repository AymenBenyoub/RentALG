/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState } from "react";

// // eslint-disable-next-line react/prop-types
// const ImageCarousel = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   return (
//     <div className="image-carousel">
//       <button onClick={prevImage}>Previous</button>
//       <img src={images[currentImageIndex]} alt="Property Image" />
//       <button onClick={nextImage}>Next</button>
//     </div>
//   );
// };

// export default ImageCarousel;
// ImageCarousel.js
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageCarousel = ({ images }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {images.map((item, idx) => {
        return (
          <img
            src={item} // Accessing the image directly without .src
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
            alt={`Slide ${idx}`}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {images.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default ImageCarousel;
