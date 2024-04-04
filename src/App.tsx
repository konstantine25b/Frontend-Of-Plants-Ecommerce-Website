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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/EachCategory" element={<EachSubCategory />} />
      <Route path="/EachProduct" element={<Product />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
