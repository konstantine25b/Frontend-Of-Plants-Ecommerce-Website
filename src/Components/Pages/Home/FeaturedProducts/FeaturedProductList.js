import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const ProductList = styled.div`
  gap: 1.5rem;
  margin-top: 2rem;

  display: flex;
  justify-content: space-around;
  padding: 2rem;

  @media (min-width: 24.375rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 48rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled.div`
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.3125rem);
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.125rem;
  color: #666;
`;
const FeaturedProductList = ({ data, getSliceCount }) => {
  const navigate = useNavigate();
  return (
    <ProductList>
      {data &&
        data.results &&
        data.results.slice(0, getSliceCount()).map((product) => (
          <ProductCard
            onClick={() =>
              navigate(`/EachProduct`, {
                state: {
                  product: product,
                },
              })
            }
            key={product.id}
          >
            <ProductImage src={product.image_url} alt={product.title} />
            <ProductName>{product.title}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductCard>
        ))}
    </ProductList>
  );
};

export default FeaturedProductList;
