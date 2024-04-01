import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import EachProduct from "./EachProduct";
import { clientProduct } from "../../../../Client/products/Product";
import { useQuery } from "react-query";

const RightSideContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.lightGray};
  padding: 1rem;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Four items per column */
  gap: 1rem;
`;


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



const RightSide = ({ subcategory }) => {
  

  const { data, isLoading, isError } = useQuery(
    ["subcategory", subcategory.id],
    () => fetchSubcategoryData(subcategory.id)
  );
  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error fetching subcategory data</div>;
  }

  return (
    <RightSideContainer>
      <div>
        <p>Total {data?.count} Items</p>
      </div>
      <ProductList>
        {data?.results.map((product, index) => (
          <EachProduct key = {index} product ={product}/>
        ))}
      </ProductList>
    </RightSideContainer>
  );
};

export default RightSide;
