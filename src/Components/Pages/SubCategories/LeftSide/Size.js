import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";

const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SizeButton = styled.button`
  padding: 0.4rem 0.7rem;
  margin-bottom: 0.5rem;
  border: none;
  font-size: 0.7rem;
  border-radius: 0.25rem;
  background-color: ${({ selected }) =>
    selected ? COLORS.fancyBlue : COLORS.primary};
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.black)};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ selected }) =>
      selected ? COLORS.hoverBlue : COLORS.fancyBlue};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
  }
`;

const SizeComponent = ({ sizes, selectedSize, onSelectSize }) => {
  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      // If the clicked size is already selected, unselect it
      onSelectSize(null);
    } else {
      // Otherwise, select the clicked size
      onSelectSize(size);
    }
  };

  return (
    <SizeContainer>
      {sizes.map((size) => (
        <SizeButton
          key={size}
          selected={selectedSize === size}
          onClick={() => handleSizeClick(size)} // Call handleSizeClick instead of directly calling onSelectSize
        >
          {size}
        </SizeButton>
      ))}
    </SizeContainer>
  );
};

export default SizeComponent;
