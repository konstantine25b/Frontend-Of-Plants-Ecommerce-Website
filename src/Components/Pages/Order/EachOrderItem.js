import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";

const CartItem = styled.div`
  background-color: ${COLORS.white};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ProductImage = styled.img`
  width: 8rem; /* Set a fixed width */
  height: 4rem; /* Set a fixed height */
  object-fit: cover; /* Make the image cover the container */
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    max-width: 5rem; /* Increase width for larger screens */
    height: auto; /* Allow height to adjust based on aspect ratio */
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: ${COLORS.black};
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${COLORS.gray};
  margin-bottom: 0.5rem;
`;

const ProductSize = styled.span`
  font-size: 0.9rem;
  color: ${COLORS.black};
  margin-right: 1rem;
`;

const ProductPrice = styled.span`
  font-size: 1rem;
  color: ${COLORS.black};
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Quantity = styled.span`
  font-size: 1.3rem;
  margin: 0 1rem;
  color: ${COLORS.black};
`;

const EachOrderItem = ({ items }) => {
  return (
    <CartItem>
      <ProductImage
        src={items[0].product.image_url}
        alt={items[0].product.title}
      />
      <ProductInfo>
        <ProductName>{items[0].product.title}</ProductName>
        <ProductDescription>
          {items[0].product.description.slice(0, 50)}...
        </ProductDescription>
        <ProductSize>Size: {items[0].product.size}</ProductSize>
        <ProductPrice>${items[0].product.price}</ProductPrice>
      </ProductInfo>
      <QuantityWrapper>
        <p>Quantity:</p>
        <Quantity>{items?.length}</Quantity>
      </QuantityWrapper>
    </CartItem>
  );
};

export default EachOrderItem;
