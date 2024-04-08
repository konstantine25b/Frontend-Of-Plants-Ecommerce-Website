import React, { useContext, useState } from "react";
import { clientOrder } from "../../../Client/order/Order";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import AuthContext from "../../../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { clientOrderItems } from "../../../Client/order/OrderItems";
import { createOrder } from "../../../Client/Requests/OrderRequests";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding-top: 2rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${COLORS.hoverBlue};
  }
`;

const MessageContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: ${(props) => (props.success ? COLORS.success : COLORS.error)};
`;

const Order = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", success: false });
  const { state } = useLocation();
  const { cartTotal, groupedProducts } = state;
  console.log(cartTotal, groupedProducts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createOrder(user.id, setMessage);
  };

  return (
    <FormContainer>
      <FormTitle>Finish Order</FormTitle>
      <form onSubmit={handleSubmit}>
        <SubmitButton type="submit">Finish Order</SubmitButton>
      </form>
      {message.text && (
        <MessageContainer success={message.success}>
          {message.text}
        </MessageContainer>
      )}
    </FormContainer>
  );
};

export default Order;
