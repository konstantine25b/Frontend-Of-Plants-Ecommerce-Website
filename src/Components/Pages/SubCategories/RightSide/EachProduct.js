import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";

const ProductItem = styled.li`
  border: 1px solid ${COLORS.borderGray};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${COLORS.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: scale(1.02); /* Corrected typo from 'scale' to 'transform' */
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${COLORS.primary};
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: ${COLORS.text};
`;

const ProductImage = styled.img`
  width: 90%;
  margin-left: 5%;
  height: 14rem;
  object-fit: cover; /* Ensure the image covers the entire container */
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

const truncateDescription = (description) => {
  if (description.length > 100) {
    return description.substring(0, 100) + "...";
  }
  return description;
};

const EachProduct = ({ product }) => {
  const truncatedDescription = truncateDescription(product.description);

  return (
    <ProductItem>
      <ProductTitle>{product.title}</ProductTitle>
      <p>Price: {product.price} $</p>
      <ProductImage src={product.image_url} alt={product.title} />
      <ProductDescription>{truncatedDescription}</ProductDescription>
    </ProductItem>
  );
};

export default EachProduct;
