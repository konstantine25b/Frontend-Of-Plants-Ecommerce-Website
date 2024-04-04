import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import { useNavigate } from "react-router-dom";

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
  if (description.length > 50) {
    return description.substring(0, 50) + "...";
  }
  return description;
};

const EachProduct = ({ product }) => {
  const navigate = useNavigate();

  const truncatedDescription = truncateDescription(product.description);

  return (
    <ProductItem
      onClick={() =>
        navigate(`/EachProduct`, {
          state: {
            product: product,
          },
        })
      }
    >
      <ProductTitle>{product.title}</ProductTitle>
      <ProductImage src={product.image_url} alt={product.title} />
      <ProductDescription>{truncatedDescription}</ProductDescription>
      <p>Price: {product.price} $</p>
    </ProductItem>
  );
};

export default EachProduct;
