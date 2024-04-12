import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  padding-top: 2rem;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const MyProducts = () => {
  const navigate = useNavigate();

  const navigateToAddProduct = () => {
    navigate("/AddProduct"); // Assuming your Add Product page route is '/add-product'
  };

  return (
    <Container>
      <Title>My Products</Title>
      <AddButton onClick={navigateToAddProduct}>Add Product</AddButton>
    </Container>
  );
};

export default MyProducts;
