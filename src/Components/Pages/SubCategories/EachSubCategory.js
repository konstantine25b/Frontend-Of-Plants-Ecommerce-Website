import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import RightSide from "./RightSide/RightSide";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  padding-left: 2.5%;
  padding-right: 2.5%;
`;

const Component1 = styled.div`
  background-color: #f0f0f0;
  width: 30%;
`;

const Component2 = styled.div`
  width: 60%;
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
