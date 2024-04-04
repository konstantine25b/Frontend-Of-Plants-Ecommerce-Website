import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { clientProduct } from "../../../Client/products/Product";
import { clientReview } from "../../../Client/products/Reviews";

const fetchProduct = async (id) => {
  try {
    const response = await clientProduct.getProduct(id);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};
const fetchReviews = async () => {
  try {
    const response = await clientReview.listReviews();
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

const Product = () => {
  const { state } = useLocation();
  const { product } = state;
  console.log(product)

  const { productInfo, isLoading, isError, refetch } = useQuery(
    ["productInfo", product.id],
    () => fetchProduct(product.id)
  );
  console.log(productInfo);

  // const { reviews, isLoading1, isError1, refetch1 } = useQuery(
  //   ["reviews"],
  //   () => fetchReviews()
  // );
  // console.log(reviews);

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }

  return <div>Product</div>;
};

export default Product;
