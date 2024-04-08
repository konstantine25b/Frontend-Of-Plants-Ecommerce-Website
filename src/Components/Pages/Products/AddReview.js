import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import AuthContext from "../../../Contexts/AuthContext";
import { createReview } from "../../../Client/Requests/ReviewRequests";

const ReviewForm = styled.form`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${COLORS.primary};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  border: 1px solid ${COLORS.gray};
  border-radius: 0.5rem; /* Increase border-radius for a softer look */
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif; /* Change font-family for better readability */
  resize: none; /* Disable textarea resizing */
  transition: border-color 0.3s; /* Add transition effect for better user experience */

  &:focus {
    border-color: ${COLORS.fancyBlue}; /* Change border color on focus */
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem; /* Increase border-radius for a softer look */
  background-color: ${COLORS.fancyBlue};
  color: ${COLORS.white};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${COLORS.hoverBlue};
  }
`;

const RatingInput = styled.input`
  width: 50px; /* Set a fixed width for the rating input */
  padding: 0.5rem;
  border: 1px solid ${COLORS.gray};
  border-radius: 0.5rem; /* Increase border-radius for a softer look */
  margin-right: 1rem; /* Add some spacing between rating input and label */
  font-family: "Roboto", sans-serif; /* Change font-family for better readability */
  transition: border-color 0.3s; /* Add transition effect for better user experience */
  margin-bottom: 1rem;
  &:focus {
    border-color: ${COLORS.fancyBlue}; /* Change border color on focus */
  }
`;

const RatingLabel = styled.label`
  font-weight: bold;
`;

const AddReview = ({ productId, refetch }) => {
  const { user } = useContext(AuthContext);
  const [newReview, setNewReview] = useState({
    product: productId,
    rating: 1,
    comment: "",
    user: 1, //ar aq mnishvbeloba mainc rac ari is iseteba
    username: user?.username || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the submission of the new review
    console.log("Submitted review:", newReview);
    createReview(newReview, refetch);

    // Clear the form after submission
    setNewReview({
      product: productId,
      rating: 1,
      comment: "",
      user: 1, //ar aq mnishvbeloba mainc rac ari is iseteba
      username: user?.username || "",
    });
  };

  return (
    <ReviewForm onSubmit={handleSubmit}>
      <RatingLabel>
        Rating:{"  "}
        <RatingInput
          type="number"
          name="rating"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={handleInputChange}
        />
      </RatingLabel>
      <TextArea
        name="comment"
        placeholder="Write your review here..."
        value={newReview.comment}
        onChange={handleInputChange}
      />
      <SubmitButton type="submit">Submit Review</SubmitButton>
    </ReviewForm>
  );
};

export default AddReview;
