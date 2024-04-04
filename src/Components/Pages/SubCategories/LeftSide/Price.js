import { useState, useEffect } from "react";
import Slider from "react-slider";
import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";

const PriceContainer = styled.div`
  margin-top: 20px;
`;

const Track = styled.div`
  background-color: ${COLORS.primary};
  height: 1px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const Thumb = styled.div`
  height: 20px;
  width: 20px;
  margin-top: -13px;
  border: 2px solid
    ${({ isDragging }) => (isDragging ? COLORS.hoverBlue : COLORS.gray)};
  background-color: ${({ isDragging }) =>
    isDragging ? COLORS.fancyBlue : COLORS.primary};
  box-shadow: ${({ isDragging }) =>
    isDragging
      ? "0px 2px 6px rgba(0, 0, 0, 0.3)"
      : "0px 2px 6px rgba(0, 0, 0, 0.1)"};
  transition: border-color 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 50%; /* Round the thumb */
  cursor: grab; /* Change cursor on hover */
`;

const PriceText = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLORS.gray};
  margin-top: 1rem;
  font-size: 14px; /* Adjust font size */
`;

const PriceComponent = ({ price, onChangePrice, mainPrice }) => {
  const [value, setValue] = useState({
    min: price.price_gte,
    max: price.price_lte,
  });

  useEffect(() => {
    if (mainPrice.min !== undefined || mainPrice.max !== undefined) {
      setValue({
        min: mainPrice.min,
        max: mainPrice.max,
      });
    }
  }, [mainPrice]);

  const handlePriceChange = (newValue) => {
    setValue({ min: newValue[0], max: newValue[1] });
  };

  const handlePriceFinalChange = (newValue) => {
    onChangePrice({ min: newValue[0], max: newValue[1] });
  };

  return (
    <PriceContainer>
      <Slider
        key="slider" // Add key to the Slider component
        min={0}
        max={100}
        value={[value.min, value.max]}
        onChange={handlePriceChange}
        onAfterChange={handlePriceFinalChange}
        renderTrack={({ props, state }) => (
          <Track
            {...props}
            isDragging={state && state.dragging && state.index === 0}
          />
        )}
        renderThumb={(props, state) => (
          <Thumb {...props} isDragging={state && state.dragging} />
        )}
      />
      <PriceText key="priceText">
        {" "}
        {/* Add key to the PriceText component */}
        <span>${value.min}</span>
        <span>${value.max}</span>
      </PriceText>
    </PriceContainer>
  );
};

export default PriceComponent;
