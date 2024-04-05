import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";
import EachSubCategory from "./Components/Pages/SubCategories/EachSubCategory";
import Product from "./Components/Pages/Products/Product";
import Home from "./Components/Pages/Home/Home";
import AllFeatured from "./Components/Pages/Home/FeaturedProducts/AllFeatured/AllFeatured";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/Home" element={<Home />} />
      <Route path="/EachCategory" element={<EachSubCategory />} />
      <Route path="/EachProduct" element={<Product />} />
      <Route path="/AllFeatured" element={<AllFeatured/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
