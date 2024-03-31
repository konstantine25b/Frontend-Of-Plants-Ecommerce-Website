import { Outlet } from "react-router-dom";
import { clientProduct } from "./Client/products/Product";
import NavBar from "./NavBar";

export default function Root() {
  clientProduct
    .listProducts()
    .then((products) => {
      console.log("Products:", products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
