import React from "react";
import { useSelector } from "react-redux";
import { selectGroupedProductsById } from "../../../Redux/Cart";
import styled from "@emotion/styled";
import EachOrderItem from "./EachOrderItem";

const CartItemsContainer = styled.div`

`;
const OrderItems = () => {
  const groupedProducts = useSelector(selectGroupedProductsById);
  return (
    <CartItemsContainer>
      {Object.entries(groupedProducts).map(([productId, items]) => (
        <EachOrderItem productId={productId} items={items} key={productId} />
      ))}
    </CartItemsContainer>
  );
};

export default OrderItems;
