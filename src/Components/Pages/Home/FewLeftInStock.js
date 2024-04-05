import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  background-image: url("https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fwysiwyg%2Fbanners%2FRareplnts_1.jpg&w=2048&q=80");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 30rem; /* Adjust height as needed */
  display: flex;
  justify-content: left; /* Center horizontally */
  align-items: flex-end; /* Changed alignment to bottom */
  overflow: hidden;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const Content = styled.div`
  text-align: left; /* Align text to the left */
  color: white;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, background-color 0.3s ease; /* Added background-color transition */
  padding: 5rem; /* Add some padding for better readability */

  &:hover {
    transform: scale(1.1); /* Increase size when hovered over */
    cursor: pointer;
    filter: brightness(110%);
  }
`;

const Title = styled.h1`
  font-size: 2rem; /* Converted from pixels to rems */
  margin-bottom: 1rem;
  letter-spacing: 0.2rem; /* Converted from pixels to rems */
  background-color: rgba(
    255,
    99,
    71,
    0.6
  ); /* Added background color with transparency */
  padding: 0.5rem 1rem; /* Added padding for better appearance */
`;

const Button = styled.button`
  background-color: #4caf50; /* Green background color */
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

const FewLeftInStock = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <Title>Last plants! Get them before they're gone!</Title>
        <Button onClick={() => navigate(`/LastItems`)}>Shop Now</Button>
      </Content>
    </Container>
  );
};

export default FewLeftInStock;
