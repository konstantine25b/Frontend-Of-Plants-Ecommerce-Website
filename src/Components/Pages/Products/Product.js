import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { clientProduct } from "../../../Client/products/Product";
import { clientReview } from "../../../Client/products/Reviews";
import ProductComponent from "./ProductDetails";
import styled from "@emotion/styled";
import ReviewsSection from "./Reviews";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  padding: 0;
  margin-bottom: 15rem;
  @media (max-width: 1024px) {
    justify-content: center;
    width: 90%;
    margin-left: 0%;
    margin-right: 0%;
  }
`;

const fetchProduct = async (id) => {
  try {
    const response = await clientProduct.getProduct(id);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};
const fetchReviews = async ({ product: id }) => {
  try {
    const response = await clientReview.listReviews({ product: id });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};
const fetchBoth = async (productId) => {
  try {
    const productPromise = fetchProduct(productId); // Fetch product
    const reviewsPromise = fetchReviews({ product: productId }); // Fetch reviews

    // Wait for both promises to resolve
    const [productResponse, reviewsResponse] = await Promise.all([
      productPromise,
      reviewsPromise,
    ]);

    return { product: productResponse, reviews: reviewsResponse };
  } catch (error) {
    throw new Error("Failed to fetch product and reviews");
  }
};

const Product = () => {
  const { state } = useLocation();
  const { product } = state;

  const { data, isLoading, isError, refetch } = useQuery(
    ["data", product],
    () => fetchBoth(product.id)
  );
  console.log(data);

  let totalRating = data?.reviews?.results.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  let ratingCount = data?.reviews?.count ?? 0;

  let averageRating = (totalRating / ratingCount).toFixed(1);

  let rating = ratingCount > 0 ? averageRating : 0;

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching Product data</div>;
  }

  return (
    <Main>
      <ProductComponent
        product={data.product}
        rating={rating}
        reviewCount={data?.reviews?.count}
      />
      <ReviewsSection productId ={data.product.id} reviews={data?.reviews?.results} refetch={refetch}/>
    </Main>
  );
};

export default Product;
