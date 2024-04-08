import React from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import { clientOrder } from "../../../Client/order/Order";

const OrderItem = styled.div`
  background-color: ${COLORS.primary};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer; /* Add pointer cursor for better interactivity */
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    .details-link {
      opacity: 1;
      pointer-events: auto;
    }
  }
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

const DetailsLink = styled.a`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${COLORS.fancyBlue};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  font-size: 1.5rem;
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

const EachOrder = ({ order, refetch }) => {
  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");
      if (!authToken) {
        throw new Error("User not authenticated. Access token missing.");
      }

      await clientOrder.deleteOrder(order.id, authToken);
      refetch();
      // Optionally, you can update the UI to reflect the deleted order
      window.alert("Order deleted successfully!"); // Display alert after successful deletion
    } catch (error) {
      console.error("Error deleting order:", error.message);
      // Handle error appropriately, such as displaying an error message to the user
    }
  };

  return (
    <OrderItem key={order.id}>
      <OrderTitle>Order ID: {order.id}</OrderTitle>

      <OrderDetails>
        Created At: {formatTimestamp(order.created_at)}
      </OrderDetails>
      <DetailsLink className="details-link" href="#">
        See Details
      </DetailsLink>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </OrderItem>
  );
};

export default EachOrder;
