import AllProducts from "./AllProducts/AllProducts";
import Categories from "./Trend";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import FewLeftInStock from "./FewLeftInStock";

const HomePage = () => {
  return (
    <div>
      <FewLeftInStock/>
      <FeaturedProducts />
      <Categories />
      <AllProducts />
    </div>
  );
};

export default HomePage;
