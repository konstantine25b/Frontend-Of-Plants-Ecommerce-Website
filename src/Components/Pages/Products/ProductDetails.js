import styled from "@emotion/styled";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import COLORS from "../../styles/Colors";

const Container = styled.div`
  display: flex;
  border-radius: 1.6rem;
  padding: 2rem;
  margin-bottom: 1rem;
  margin-top: 1rem;

  @media (max-width: 1025px) {
    flex-direction: column;
    align-items: center;
    margin-left: 5%;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1.6rem;
  @media (max-width: 1025px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const DataContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${COLORS.black};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray};
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: ${COLORS.black};
  font-weight: bold;
`;

const Size = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray};
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GoldenStar = styled(FaStar)`
  color: ${COLORS.golden};
`;

const GrayStar = styled(FaStar)`
  color: ${COLORS.gray};
`;

const HalfStar = styled(FaStarHalfAlt)`
  color: ${COLORS.golden};
`;

const generateStars = (rating) => {
  let stars = [];
  let fullStars = Math.floor(rating);
  let hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<GoldenStar key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<HalfStar key={fullStars} />);
    fullStars++;
  }

  for (let i = fullStars; i < 5; i++) {
    stars.push(<GrayStar key={i} />);
  }

  return stars;
};

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const RatingText = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray};
  margin-left: 0.5rem;
`;

const ProductComponent = ({ product, rating, reviewCount }) => {
  let stars = generateStars(rating);

  return (
    <Container>
      <ImageContainer>
        <Image src={product.image_url} alt={product.title} />
      </ImageContainer>
      <DataContainer>
        <Title>{product.title}</Title>
        <RatingContainer>
          <StarContainer>{stars}</StarContainer>
          <RatingText>
            {rating} ({reviewCount} Reviews)
          </RatingText>
        </RatingContainer>
        <Size>Size: {product.size}</Size>
        <Description>{product.description}</Description>
        <Price>${product.price}</Price>
      </DataContainer>
    </Container>
  );
};

export default ProductComponent;
