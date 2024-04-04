import { useState } from "react";
import styled from "@emotion/styled";
import SizeComponent from "./Size";
import PriceComponent from "./Price";


const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px solid gray;
  height: fit-content; /* Adjust height based on content */
`;

const Title = styled.h2`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
`;

const LeftSide = ({ setSize, size, setPrice, price }) => { // Add setPrice as a prop
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState({ min: 0, max: 300 }); // Initialize selectedPrice state

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSize(size);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    setPrice(price); // Pass selected price to the parent component
  };

  return (
    <LeftSideContainer>
      <Title>Choose Size:</Title>
      <SizeComponent
        sizes={["XS", "S", "M", "L", "XL", "XXL"]}
        selectedSize={selectedSize}
        onSelectSize={handleSizeChange}
        size={size}
      />
      <Title>Choose Price Range:</Title>
      <PriceComponent
        price={{ price_gte: selectedPrice.min, price_lte: selectedPrice.max }} // Pass price as an object
        onChangePrice={handlePriceChange}
        mainPrice ={price}
      />
    </LeftSideContainer>
  );
};

export default LeftSide;
