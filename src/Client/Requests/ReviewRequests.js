import { clientReview } from "../products/Reviews";

export const createReview = async (reviewData, refetch) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }

    const createdReview = await clientReview.createReview(
      reviewData,
      authToken
    );
    refetch();
    console.log("Review created successfully:", createdReview);
  } catch (error) {
    console.error("Error creating review:", error.message);
    // Handle error appropriately, such as displaying an error message to the user
  }
};
export const fetchReviews = async ({ product: id }) => {
    try {
      const response = await clientReview.listReviews({ product: id });
      return response;
    } catch (error) {
      throw new Error("Failed to fetch subcategory data");
    }
  };