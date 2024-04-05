import AllProducts from "./AllProducts/AllProducts";
import Categories from "./Trend";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import FewLeftInStock from "./FewLeftInStock";
import { useQuery } from "react-query";
import { clientProduct } from "../../../Client/products/Product";

const fetchData = async () => {
  try {
    const response = await clientProduct.listProducts({
      is_active: true,
    });

    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

const HomePage = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["allProducts"],
    fetchData
  );

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }
  return (
    <div>
      <FewLeftInStock />
      <AllProducts data={data} />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
