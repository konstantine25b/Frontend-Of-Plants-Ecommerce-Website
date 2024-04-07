import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import COLORS from "../../styles/Colors";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Cart";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
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

const NumberDisplay = styled.span`
  font-size: 1.3rem;
  margin: 0 1rem;
  color: ${COLORS.black};
`;

const Label = styled.div`
  font-size: 1rem;
  color: ${COLORS.black};
  display: flex;
  align-items: center;
  margin-left: 3rem;

  cursor: pointer;
  background-color: ${COLORS.main};
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  transition: background-color 0.3s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const AddProduct = (product) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);

  const handleIncrement = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const handleDecrement = () => {
    if (number > 1) {
      setNumber((prevNumber) => prevNumber - 1);
    }
  };

  const handleCart = () => {
    for (let i = 0; i < number; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <Container>
      <Button onClick={handleDecrement} disabled={number <= 1 ? true : false}>
        <MinusIcon width="1.3rem" height="1.3rem" color={COLORS.white} />
      </Button>
      <NumberDisplay>{number}</NumberDisplay>
      <Button onClick={handleIncrement}>
        <PlusIcon width="1.3rem" height="1.3rem" color={COLORS.white} />
      </Button>
      <Label onClick={handleCart}>
        <ShoppingCartIcon width="1.5rem" height="1.5rem" color={COLORS.black} />
        Add to Cart
      </Label>
    </Container>
  );
};

export default AddProduct;
