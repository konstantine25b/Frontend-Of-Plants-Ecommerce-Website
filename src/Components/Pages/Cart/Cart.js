import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartTotal,
  selectGroupedProductsById,
} from "../../../Redux/Cart";
import styled from "@emotion/styled";
import EachCartItem from "./EachCartItem";
import COLORS from "../../styles/Colors";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Contexts/AuthContext";

const Container = styled.div`
  padding: 2rem;
  margin-bottom: 5rem;
`;

const CartItemsContainer = styled.div`
  margin-bottom: 2rem;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 1rem 2rem;
  border-top: 0.3px solid black;
`;

const TotalAmount = styled.span`
  font-size: 1.2rem;
  color: ${COLORS.black};
`;

const GoToOrderButton = styled.button`
  background-color: ${COLORS.main};
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 2.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    color: ${COLORS.white};
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Cart = () => {
  const navigate = useNavigate();
  const cartTotal = useSelector(selectCartTotal);
  const groupedProducts = useSelector(selectGroupedProductsById);
  const { user } = useContext(AuthContext);
  const handleNavigation = () => {
    if (user) {
      navigate("/Order", {
        state: {
          cartTotal: cartTotal,
          groupedProducts: groupedProducts,
        },
      });
    } else {
      navigate("/LogIn");
    }
  };

  return (
    <Container>
      <CartItemsContainer>
        {Object.entries(groupedProducts).map(([productId, items]) => (
          <EachCartItem productId={productId} items={items} key={productId} />
        ))}
      </CartItemsContainer>
      <TotalContainer>
        <TotalAmount>Total: ${cartTotal}</TotalAmount>
      </TotalContainer>
      <ButtonDiv>
        <GoToOrderButton onClick={() => handleNavigation()}>
          Proceed to checkout
        </GoToOrderButton>
      </ButtonDiv>
    </Container>
  );
};

export default Cart;
