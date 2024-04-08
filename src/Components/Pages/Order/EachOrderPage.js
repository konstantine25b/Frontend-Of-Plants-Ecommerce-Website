import React from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { clientOrder } from "../../../Client/order/Order";
import COLORS from "../../styles/Colors";
import { deleteOrder } from "../../../Client/Requests/OrderRequests";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const OrderDetails = styled.div`
  margin-bottom: 1rem;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  margin-left: 0.5rem;
`;
const DeleteButton = styled.button`
  background-color: ${COLORS.fancyRed};
  color: ${COLORS.white};
  border: none;
  z-index: 2;
  border-radius: 0.3rem;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    color: black;
  }
`;
const formatTimestamp = (timestamp) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(timestamp).toLocaleDateString("en-US", options);
};

const EachOrderPage = () => {
  const { state } = useLocation();
  const { order } = state;
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Order Details</Title>
      <OrderDetails>
        <DetailLabel>Order ID:</DetailLabel>
        <DetailValue>{order.id}</DetailValue>
      </OrderDetails>
      <OrderDetails>
        <DetailLabel>Created At:</DetailLabel>
        <DetailValue>{formatTimestamp(order.created_at)}</DetailValue>
      </OrderDetails>
      <DeleteButton onClick={() => deleteOrder(order, navigate)}>
        Delete Order
      </DeleteButton>
    </Container>
  );
};

export default EachOrderPage;
