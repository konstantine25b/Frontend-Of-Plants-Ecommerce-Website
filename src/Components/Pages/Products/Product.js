import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { clientProduct } from "../../../Client/products/Product";

const fetchProduct = async (id) => {
  try {
    const response = await clientProduct.getProduct(id);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

const Product = () => {
  const { state } = useLocation();
  const { product } = state;

  const { data, isLoading, isError, refetch } = useQuery(
    ["product", product.id],
    () => fetchProduct(product.id)
  );
  console.log(data);

  
  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }

  return <div>Product</div>;
};

export default Product;
