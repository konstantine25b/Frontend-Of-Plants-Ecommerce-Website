import AllProducts from "./AllProducts/AllProducts";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <FeaturedProducts />
      <AllProducts/>
    </div>
  );
};

export default HomePage;
