import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
const reviews = [
  {
    stars: 4,
    reviewer: "John Doe",
    text: "Great experience!",
    profilePicture: "john-doe.jpg",
  },
  {
    stars: 5,
    reviewer: "Jane Smith",
    text: "Highly recommended!",
    profilePicture: "jane-smith.jpg",
  },
  // Add more reviews here
];
const ReviewList = () => {
  const totalScore = reviews.reduce((acc, review) => acc + review.stars, 0);
  const averageScore = totalScore / reviews.length;

  return (
    <div className="review-list">
      <div className="total-summary">
        <h4>Total Summary Score</h4>
        <div>Total Score: {totalScore}</div>
        <div>Average Score: {averageScore.toFixed(1)}</div>
      </div>
      <div className="review-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-container">
            <div className="review-header">
              <div className="profile-picture">
                <Avatar size={35} />
              </div>
              <Link to="" className="link-decoration">
                <div>{review.reviewer}</div>
              </Link>
            </div>
            <div className="star-rating">
              {Array.from({ length: review.stars }).map((_, index) => (
                <FaStar key={index} color="#ffd700" />
              ))}
            </div>
            <div>{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
