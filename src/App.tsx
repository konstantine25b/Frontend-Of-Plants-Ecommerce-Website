import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";
import EachSubCategory from "./Components/Pages/SubCategories/EachSubCategory";
import Product from "./Components/Pages/Products/Product";
import Home from "./Components/Pages/Home/Home";
import AllFeatured from "./Components/Pages/AllFeatured/AllFeatured";
import AllProductsPage from "./Components/Pages/AllProductsPage/AllProductsPage";
import LastItems from "./Components/Pages/LastItems/LastItems";
import SearchPage from "./Components/Pages/NavBar/UpperNav/Search/SearchPage";
import Cart from "./Components/Pages/Cart/Cart";
import Login from "./Components/Authentication/LogIn/Login";
import SignUp from "./Components/Authentication/SignUp/SignUp";
import Order from "./Components/Pages/Order/Order";

import MyOrders from "./Components/Pages/Order/MyOrders";
import EachOrderPage from "./Components/Pages/Order/EachOrderPage";
import MyProducts from "./Components/Pages/Vendors/MyProducts/MyProducts";
import AddProduct from "./Components/Pages/Vendors/MyProducts/AddProduct";
import MyProductDetails from "./Components/Pages/Vendors/MyProducts/MyProductComponents.js/MyProductDetails";
import CustomerOrders from "./Components/Pages/Vendors/CustomersOrders/CustomerOrders";
import Profile from "./Components/Profile/Profile";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index={true} element={<Home />} />
      <Route path="/EachCategory" element={<EachSubCategory />} />
      <Route path="/EachProduct" element={<Product />} />
      <Route path="/AllFeatured" element={<AllFeatured />} />
      <Route path="/AllProducts" element={<AllProductsPage />} />
      <Route path="/LastItems" element={<LastItems />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Order" element={<Order />} />
      <Route path="/MyOrders" element={<MyOrders />} />
      <Route path="/EachOrder" element={<EachOrderPage />} />
      <Route path="/MyProducts" element={<MyProducts/>} />
      <Route path="/MyProductDetails" element={<MyProductDetails/>} />
      <Route path="/AddProduct" element={<AddProduct/>} />
      <Route path="/CustomerOrders" element={<CustomerOrders/>} />
      

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
