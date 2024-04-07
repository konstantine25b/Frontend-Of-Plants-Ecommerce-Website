import React, { useState } from "react";
import styled from "@emotion/styled";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import COLORS from "../../styles/Colors";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../Redux/Cart";

const CartItem = styled.div`
  background-color: ${COLORS.white};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 10rem;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: ${COLORS.black};
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${COLORS.gray};
  margin-bottom: 0.5rem;
`;

const ProductSize = styled.span`
  font-size: 0.9rem;
  color: ${COLORS.black};
  margin-right: 1rem;
`;

const ProductPrice = styled.span`
  font-size: 1rem;
  color: ${COLORS.black};
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Quantity = styled.span`
  font-size: 1.3rem;
  margin: 0 1rem;
  color: ${COLORS.black};
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%; /* Make the button circular */
  padding: 0.5rem;
  transition: background-color 0.3s ease; /* Add transition effect on hover */

  background-color: ${COLORS.primary}; /* Change background color on hover */

  &:hover {
    background-color: ${COLORS.gray}; /* Change background color on hover */
  }
`;

const EachCartItem = ({ items }) => {
  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    dispatch(addToCart({ product: product }));
  };

  const handleDecrement = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <CartItem>
      <ProductImage
        src={items[0].product.image_url}
        alt={items[0].product.title}
      />
      <ProductInfo>
        <ProductName>{items[0].product.title}</ProductName>
        <ProductDescription>
          {items[0].product.description.slice(0, 50)}...
        </ProductDescription>
        <ProductSize>Size: {items[0].product.size}</ProductSize>
        <ProductPrice>${items[0].product.price}</ProductPrice>
      </ProductInfo>
      <QuantityWrapper>
        <Button onClick={() => handleDecrement(items[0].product.id)}>
          <MinusIcon width="1.5rem" height="1.5rem" />
        </Button>
        <Quantity>{items?.length}</Quantity>
        <Button onClick={() => handleIncrement(items[0].product)}>
          <PlusIcon width="1.5rem" height="1.5rem" />
        </Button>
      </QuantityWrapper>
    </CartItem>
  );
};

export default EachCartItem;
