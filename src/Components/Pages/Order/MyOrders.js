import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import { clientOrder } from "../../../Client/order/Order";
import EachOrder from "./EachOrder";
import { useQuery } from "react-query";

const OrdersContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: ${COLORS.fancyRed};
  text-align: center;
  margin-top: 1rem;
`;

const LoadingMessage = styled.div`
  color: ${COLORS.gray};
  text-align: center;
  margin-top: 1rem;
`;

const fetchOrders = async () => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }

    const fetchedOrders = await clientOrder.listOrders(authToken);
    return fetchedOrders;
  } catch (error) {
    throw new Error("Failed to fetch product and reviews");
  }
};
const MyOrders = () => {
  const { data, isLoading, isError, refetch } = useQuery(["MyOrders"], () =>
    fetchOrders()
  );

  return (
    <OrdersContainer>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>My Orders</h2>
      {isLoading && <LoadingMessage>Loading orders...</LoadingMessage>}
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {!isLoading &&
        !isError &&
        Array.isArray(data.results) &&
        data.results.map((order) => (
          <EachOrder key={order.id} order={order} refetch={refetch} />
        ))}
    </OrdersContainer>
  );
};

export default MyOrders;
