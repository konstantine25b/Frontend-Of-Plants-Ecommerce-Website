import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import RightSide from "./RightSide/RightSide";
import { clientProduct } from "../../../Client/products/Product";
import { useState } from "react";
import { useQuery } from "react-query";

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

const fetchSubcategoryData = async (
  id,
  page = 1,
  dataInfo = [],
  prevPage = 1
) => {
  try {
    const response = await clientProduct.listProducts(
      {
        subcategory: id,
      },
      page,
      dataInfo,
      prevPage
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

const EachSubCategory = () => {

  const { state } = useLocation();
  const { subcategory } = state;
  const [dataInfo, setDataInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery(
    ["subcategory", subcategory.id, currentPage],
    () => fetchSubcategoryData(subcategory.id, currentPage, dataInfo, prevPage)
  );



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }

  return (
    <Container>
      <Component1>Component 1 (30%)</Component1>
      <div></div> {/* Gap */}
      <Component2>
        <RightSide
          subcategory={subcategory}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPrevPage={setPrevPage}
          prevPage={prevPage}
          data={data}
          setDataInfo={setDataInfo}
        />
      </Component2>
    </Container>
  );
};

export default EachSubCategory;
