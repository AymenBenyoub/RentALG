/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { FaStar } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Avatar from "./Avatar";
// import { useEffect, useState } from "react";

// const ReviewsList = ({ reviews }) => {
//   const [reviewer, setReviewer] = useState(null);
//   const totalScore = reviews.reduce((acc, review) => acc + review.rating, 0);
//   const averageScore = totalScore / reviews.length;
//   useEffect(() => {
//     const getReviewer = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/users/${reviews.reviewer_id}`
//         );
//         const fetchedReviewer = await response.json();
//         setReviewer(fetchedReviewer);
//       } catch (error) {
//         console.error("error getting reviewer", error);
//       }
//     };
//     getReviewer();
//   }, [reviews.reviewer_id]);
//   return (
//     <div className="review-list">
//       <div className="total-summary">
//         <h4>Total Summary Score</h4>
//         <div>Total Score: {totalScore}</div>
//         <div>Average Score: {averageScore.toFixed(1)}</div>
//       </div>
//       <div className="review-grid">
//         {reviews.map((review, index) => (
//           <div key={index} className="review-container">
//             <div className="review-header">
//               <div className="profile-picture">
//                 <Avatar size={35} />
//               </div>
//               <Link to="" className="link-decoration">
//                 <div>{reviewer.first_name + " " + reviewer.last_name}</div>
//               </Link>
//             </div>
//             <div className="star-rating">
//               {Array.from({ length: review.rating }).map((_, index) => (
//                 <FaStar key={index} color="#ffd700" />
//               ))}
//             </div>
//             <div>{review.review_text}</div>{" "}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewsList;
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";

const ReviewsList = ({ reviews }) => {
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    const getReviewers = async () => {
      try {
        const promises = reviews.map(async (review) => {
          const response = await fetch(
            `http://localhost:3000/api/users/${review.reviewer_id}`
          );
          const fetchedReviewer = await response.json();
          return fetchedReviewer;
        });
        const fetchedReviewers = await Promise.all(promises);
        setReviewers(fetchedReviewers);
      } catch (error) {
        console.error("error getting reviewers", error);
      }
    };
    getReviewers();
  }, [reviews]);

  return (
    <div className="review-list">
      <div className="review-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-container">
            <div className="review-header">
              <div className="profile-picture">
                <Avatar size={35} />
              </div>
              <Link to="" className="link-decoration">
                {reviewers[index] && (
                  <div>
                    {reviewers[index].first_name +
                      " " +
                      reviewers[index].last_name}
                  </div>
                )}
              </Link>
            </div>
            <div className="star-rating">
              {Array.from({ length: review.rating }).map((_, index) => (
                <FaStar key={index} color="#ffd700" />
              ))}
            </div>
            <div>{review.review_text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
