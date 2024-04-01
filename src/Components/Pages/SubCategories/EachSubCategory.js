import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import RightSide from "./RightSide/RightSide";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 0;
  @media (max-width: 1024px) {
    justify-content: center;
    width: 90%;
    margin-left: 0%;
    margin-right: 0%;
  }
`;

const Component1 = styled.div`
  background-color: #f0f0f0;
  width: 25%;
  padding: 0;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Component2 = styled.div`
  width: 70%;
  padding: 0;
  margin: 0;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const EachSubCategory = () => {
  const { state } = useLocation();
  const { subcategory } = state;

  return (
    <Container>
      <Component1>Component 1 (30%)</Component1>
      <div></div> {/* Gap */}
      <Component2>
        <RightSide subcategory={subcategory} />
      </Component2>
    </Container>
  );
};

export default EachSubCategory;
