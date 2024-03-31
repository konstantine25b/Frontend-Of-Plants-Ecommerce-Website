import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { clientProduct } from "../../../Client/products/Product";
import styled from "@emotion/styled";

const fetchSubcategoryData = async (id) => {
  try {
    const response = await clientProduct.listProducts({
      subcategory: id,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

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
  background-color: #e0e0e0;
  width: 60%;
`;

const EachSubCategory = () => {
  const { state } = useLocation();
  const { subcategory } = state;

  const { data, isLoading, isError } = useQuery(
    ["subcategory", subcategory.id],
    () => fetchSubcategoryData(subcategory.id)
  );

  console.log(data);

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }

  return (
    <Container>
      <Component1>Component 1 (30%)</Component1>
      <div></div> {/* Gap */}
      <Component2>Component 2 (60%)</Component2>
    </Container>
  );
};

export default EachSubCategory;
