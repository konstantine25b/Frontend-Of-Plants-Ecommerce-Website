import React from "react";
import { useLocation } from "react-router-dom";

const Product = () => {
  const { state } = useLocation();
  const {product}= state
  console.log(product)

  return <div>Product</div>;
};

export default Product;
