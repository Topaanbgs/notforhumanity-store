import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating, reviewCount, showReviews = true }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center">{renderStars(rating)}</div>
      {showReviews && (
        <div className="text-gray-600">({reviewCount || 0} reviews)</div>
      )}
    </div>
  );
};

export default StarRating;