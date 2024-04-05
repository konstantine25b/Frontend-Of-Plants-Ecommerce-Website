import AllProducts from "./AllProducts/AllProducts";
import Categories from "./Trend";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <FeaturedProducts />
      <Categories />
      <AllProducts />
    </div>
  );
};

export default HomePage;
