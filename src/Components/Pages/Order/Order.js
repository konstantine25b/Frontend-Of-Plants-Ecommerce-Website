import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import AuthContext from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../Client/Requests/OrderRequests";
import OrderItems from "./OrderItems";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../../Redux/Cart";

const FormContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem 4rem;
  font-size: 1rem;
  background-color: ${COLORS.fancyBlue};
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

const TotalContainer = styled.div`
  text-align: center;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-top: 0.5px solid gray;
  border-bottom: 0.5px solid gray;
`;

const TotalAmount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${COLORS.black};
`;

const Order = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", success: false });
  const cartTotal = useSelector(selectCartTotal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder(user.id, setMessage);
    navigate("/MyOrders"); // Redirect to MyOrders page
  };

  return (
    <FormContainer>
      <FormTitle>Finish Order</FormTitle>
      <OrderItems />
      <TotalContainer>
        <p>Total:</p>
        <TotalAmount>${cartTotal}</TotalAmount>
      </TotalContainer>
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
