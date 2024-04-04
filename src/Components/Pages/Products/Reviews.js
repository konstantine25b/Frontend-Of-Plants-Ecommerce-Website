import React from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";

const ReviewsContainer = styled.div`
  margin-top: 2rem;
`;

const ReviewItem = styled.div`
  margin-bottom: 1.5rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserName = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const ReviewDate = styled.span`
  color: ${COLORS.gray};
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  color: ${COLORS.black};
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  color: ${(props) => (props.golden ? COLORS.golden : COLORS.gray)};
  margin-right: 0.1rem;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const generateStarIcons = (rating) => {
  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <StarIcon key={i} golden={i < rating}>
        &#9733;
      </StarIcon> // Unicode character for star
    );
  }
  return starIcons;
};

const ReviewsSection = ({ reviews }) => {
  return (
    <ReviewsContainer>
      {reviews.map((review) => {
        return (

          <ReviewItem key={review.id}>
            <ReviewHeader>
              <UserName>{review.username}</UserName>
              <ReviewDate>{formatDate(review.created_at)}</ReviewDate>
            </ReviewHeader>
            <StarRating>
              {generateStarIcons(review.rating)}
              <span>({review.rating.toFixed(1)})</span>
            </StarRating>
            <ReviewContent>{review.comment}</ReviewContent>
          </ReviewItem>
        );
      })}
    </ReviewsContainer>
  );
};

export default ReviewsSection;
