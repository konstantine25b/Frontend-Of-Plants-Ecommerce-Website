import React, { useContext, useState } from "react";
import { clientOrder } from "../../../Client/order/Order";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import AuthContext from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("accessToken");
      if (!authToken) {
        throw new Error("User not authenticated. Access token missing.");
      }

      const createdOrder = await clientOrder.createOrder(
        { customer: user.id }, // Corrected key name to match the backend
        authToken
      );

      console.log("Order created successfully:", createdOrder);
      if (createdOrder) {
        setMessage({ text: "Order created successfully.", success: true });
        // Optionally, you can redirect the user or display a success message
        navigate("/myorders"); // Redirect to MyOrders page
      } else {
        setMessage({
          text: "Failed to create order. Please try again.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
      setMessage({
        text: "Failed to create order. Please try again.",
        success: false,
      });
      // Handle error appropriately, such as displaying an error message to the user
    }
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
