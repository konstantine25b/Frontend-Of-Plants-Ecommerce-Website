import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import RightSide from "./RightSide/RightSide";
import { clientProduct } from "../../../Client/products/Product";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LeftSide from "./LeftSide/LeftSide";
import { fetchSubcategoryData } from "../../../Client/Requests/ProductRequests";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 0;
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
    margin-right: 0%;
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;

const Component1 = styled.div`
  width: 25%;
  padding: 0;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

const Component2 = styled.div`
  width: 70%;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;



const EachSubCategory = () => {
  const { state } = useLocation();
  const { subcategory } = state;
  const [dataInfo, setDataInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [size, setSize] = useState();
  const [price, setPrice] = useState({
    price_gte: undefined,
    price_lte: undefined,
  });

  const { data, isLoading, isError, refetch } = useQuery(
    ["subcategory", subcategory.id, currentPage, size, price],
    () =>
      fetchSubcategoryData(
        subcategory.id,
        size,
        price.min,
        price.max,
        currentPage,
        dataInfo,
        prevPage
      )
  );
  useEffect(() => {
    // Reset price to default when subcategory changes
    setSize();
    setPrice({ price_gte: undefined, price_lte: undefined });
  }, [subcategory]);

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }

  return (
    <Container>
      <Component1>
        <LeftSide
          setSize={setSize}
          size={size}
          setPrice={setPrice}
          price={price}
        />
      </Component1>
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
