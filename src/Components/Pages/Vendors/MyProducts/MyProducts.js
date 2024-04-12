import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import AuthContext from "../../../../Contexts/AuthContext";
import { fetchVendorData } from "../../../../Client/Requests/ProductRequests";
import { useQuery } from "react-query";
import COLORS from "../../../styles/Colors";
import RightSide from "../../SubCategories/RightSide/RightSide";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  padding-top: 2rem;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: ${COLORS.fancyBlue};
  color: #fff;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.hoverBlue};
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

const MyProducts = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const navigateToAddProduct = () => {
    navigate("/AddProduct"); // Assuming your Add Product page route is '/add-product'
  };
  const [dataInfo, setDataInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const { data, isLoading, isError, refetch } = useQuery(
    ["VendorsProducts", currentPage, user],
    () => fetchVendorData(user.id, currentPage, dataInfo, prevPage)
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
      <Title>My Products</Title>
      <AddButton onClick={navigateToAddProduct}>Add Product</AddButton>
      <Component2>
        <RightSide
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

export default MyProducts;
