import React from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import COLORS from "../../../../styles/Colors";

const ProductDetailsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductDetailItem = styled.div`
  margin-bottom: 20px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const DetailValue = styled.span`
  color: ${COLORS.text};
`;

const MyProductDetails = () => {
  const { state } = useLocation();
  const { product } = state;

  return (
    <ProductDetailsContainer>
      <ProductDetailItem>
        <DetailLabel>Title:</DetailLabel>
        <DetailValue>{product.title}</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Subcategory:</DetailLabel>
        <DetailValue>{product.subcategory} </DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Description:</DetailLabel>
        <DetailValue>{product.description}</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Price:</DetailLabel>
        <DetailValue>{product.price} $</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Quantity:</DetailLabel>
        <DetailValue>{product.quantity}</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Size:</DetailLabel>
        <DetailValue>{product.size}</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Is Active:</DetailLabel>
        <DetailValue>{product.is_active ? "Yes" : "No"}</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Is Featured:</DetailLabel>
        <DetailValue>{product.is_featured ? "Yes" : "No"}</DetailValue>
      </ProductDetailItem>
      <ProductDetailItem>
        <DetailLabel>Image:</DetailLabel>
        <img
          src={product.image_url}
          alt={product.title}
          style={{ maxWidth: "100%" }}
        />
      </ProductDetailItem>
    </ProductDetailsContainer>
  );
};

export default MyProductDetails;
