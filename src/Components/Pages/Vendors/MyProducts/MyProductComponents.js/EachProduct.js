import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import COLORS from "../../../../styles/Colors";

const ProductItem = styled.li`
  border: 1px solid ${COLORS.borderGray};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column; /* Ensure items stack vertically */
  background-color: ${COLORS.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const ProductContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`;

const ProductImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const ProductInfo = styled.div`
  flex: 1; /* Take up remaining space */
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${COLORS.black};
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: ${COLORS.text};
  word-break: break-all; /* Break words if they exceed container width */
  word-wrap: break-word; /* Ensure long words or URLs wrap to next line */
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: ${COLORS.primary};
`;

const EachProduct = ({ product }) => {
  const navigate = useNavigate();

  const truncatedDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + "...";
    }
    return description;
  };

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
      <ProductContent>
        <ProductImage src={product.image_url} alt={product.title} />
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>
            Description:sadjckdsvkjadskjdkjvdkjskjdsvkjdvkssdsndckvsdkjvdjknsjncdkkjndkjnsdknjdjknsf{" "}
            {truncatedDescription(product.description)}
          </ProductDescription>
        </ProductInfo>
        <ProductPrice>Price: {product.price} $</ProductPrice>
      </ProductContent>
    </ProductItem>
  );
};

export default EachProduct;
