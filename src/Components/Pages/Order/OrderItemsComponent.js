import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import { fetchProduct } from "../../../Client/Requests/ProductRequests";

const CardContainer = styled.div`
  background-color: ${COLORS.white};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex; /* Added to align items horizontally */
  align-items: center; /* Added to vertically center items */
`;

const ProductImage = styled.img`
  height: 7rem; /* Ensure the image takes full height of the container */
  object-fit: cover; /* Ensure the image covers the entire container */
  border-radius: 0.5rem;
  margin-right: 1rem; /* Added margin to create space between image and text */
`;

const ProductInfo = styled.div`
  flex-grow: 1; /* Added to let this div grow and occupy remaining space */
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  color: ${COLORS.black};
  margin-bottom: 0.5rem; /* Added margin bottom for spacing */
`;

const ProductQuantity = styled.span`
  font-size: 1rem;
  color: ${COLORS.gray};
`;

const ProductDetails = styled.div`
  color: ${COLORS.gray};
  font-size: 0.9rem;
`;

const OrderItemsComponent = ({ item }) => {
  const [product, setProduct] = useState(null); // Changed initial state to null

  useEffect(() => {
    const fetchProductHere = async () => {
      try {
        const data = await fetchProduct(item.product);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchProductHere();

    // Cleanup function not needed here since this effect doesn't have any cleanup
  }, [item]); // Include item.product in dependency array

  return (
    <CardContainer>
      {product && <ProductImage src={product.image_url} alt={product.title} />}
      <ProductInfo>
        {product && (
          <>
            <ProductTitle>{product.title}</ProductTitle>
            <p>${product.price}</p>
            <ProductQuantity>Quantity: {item.quantity}</ProductQuantity>
          </>
        )}
      </ProductInfo>
    </CardContainer>
  );
};

export default OrderItemsComponent;
