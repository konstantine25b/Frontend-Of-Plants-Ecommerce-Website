import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";

const PriceContainer = styled.div`
  margin-top: 20px;
`;

const Track = styled.div`
  background-color: ${({ isDragging }) =>
    isDragging ? COLORS.fancyBlue : COLORS.lightGray};
  height: 8px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const Thumb = styled.div`
  height: 20px;
  width: 20px;
  margin-top: -7px;
  border: 2px solid
    ${({ isDragging }) => (isDragging ? COLORS.hoverBlue : COLORS.primary)};
  background-color: ${({ isDragging }) =>
    isDragging ? COLORS.fancyBlue : COLORS.white};
  box-shadow: ${({ isDragging }) =>
    isDragging
      ? "0px 2px 6px rgba(0, 0, 0, 0.3)"
      : "0px 2px 6px rgba(0, 0, 0, 0.1)"};
  transition: border-color 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
`;

const PriceComponent = ({ price, onChangePrice, mainPrice }) => {
  const [value, setValue] = useState({
    min: price.price_gte,
    max: price.price_lte,
  });

  useEffect(() => {
    
    if (
      mainPrice.min != undefined ||
      mainPrice.max!= undefined
    ) {
      
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
        min={0}
        max={1000}
        value={[value.min, value.max]}
        onChange={handlePriceChange}
        onAfterChange={handlePriceFinalChange}
        renderTrack={({ props, state }) => (
          <Track {...props} isDragging={state && state.dragging} />
        )}
        renderThumb={(props, state) => (
          <Thumb {...props} isDragging={state && state.dragging} />
        )}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span>${value.min}</span>
        <span>${value.max}</span>
      </div>
    </PriceContainer>
  );
};

export default PriceComponent;
