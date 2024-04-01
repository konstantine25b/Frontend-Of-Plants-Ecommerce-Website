import { useState } from "react";
import styled from "@emotion/styled";
import SizeComponent from "./Size";

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

const LeftSide = ({setSize}) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSize(size)
    console.log("Selected size:", size);
  };

  return (
    <LeftSideContainer>
      <Title>Choose Size:</Title>
      <SizeComponent
        sizes={["XS", "S", "M", "L", "XL", "XXL"]}
        selectedSize={selectedSize}
        onSelectSize={handleSizeChange}
      />
    </LeftSideContainer>
  );
};

export default LeftSide;
