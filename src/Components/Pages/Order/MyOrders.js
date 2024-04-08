import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import { clientOrder } from "../../../Client/order/Order";
import EachOrder from "./EachOrder";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../Client/Requests/OrderRequests";

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
