import React from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import { clientOrder } from "../../../Client/order/Order";
import { useNavigate } from "react-router-dom";
import { deleteOrderForOrderPage } from "../../../Client/Requests/OrderRequests";

const OrderItem = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;

  transition: background-color 0.3s;
  position: relative;
`;

const OrderTitle = styled.h3`
  color: ${COLORS.black};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const OrderDetails = styled.p`
  color: ${COLORS.black};
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const DetailsLink = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;

  transition: opacity 0.3s;
  font-size: 1.2rem;
  color: ${COLORS.fancyBlue};
  &:hover {
    text-decoration: underline;
    color: ${COLORS.hoverBlue};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${COLORS.fancyRed};
  color: ${COLORS.white};
  border: none;
  z-index: 1;
  border-radius: 0.3rem;
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;
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

const EachOrder = ({ order, refetch }) => {
  const navigate = useNavigate();

  return (
    <OrderItem key={order.id}>
      <OrderTitle>Order ID: {order.id}</OrderTitle>

      <OrderDetails>
        Created At: {formatTimestamp(order.created_at)}
      </OrderDetails>
      <DetailsLink
        onClick={() =>
          navigate("/EachOrder", {
            state: {
              order: order,
            },
          })
        }
      >
        See Details
      </DetailsLink>
      <DeleteButton onClick={() => deleteOrderForOrderPage(order, refetch)}>
        Delete Order
      </DeleteButton>
    </OrderItem>
  );
};

export default EachOrder;
