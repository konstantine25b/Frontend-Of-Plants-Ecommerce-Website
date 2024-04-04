import { subcategoryClient } from "../../../../Client/products/SubCategories";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import { useNavigate } from "react-router-dom";

const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0;
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: 15rem;
  z-index: 1;
  background-color: ${COLORS.main};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Add shadow */
`;

const SubcategoryItem = styled.li`
  padding: 0.5rem 1rem; /* Add padding */
  border-bottom: 0.1px solid ${COLORS.gray}; /* Add border bottom */
  &:hover {
    color: ${COLORS.hoverBlue};
    cursor: pointer;
  }
`;

const SubCategories = ({ Id }) => {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: subcategories,
    error,
  } = useQuery(["subcategories", Id], () =>
    subcategoryClient.listSubcategories(Id)
  );

  return (
    <div>
      {isLoading && <div></div>}
      {isError && <div>Error: {error.message}</div>}
      {subcategories && (
        <SubcategoryList>
          {subcategories.results?.map((subcategory, index) => {
            return (
              <SubcategoryItem
                key={index}
                onClick={() =>
                  navigate(`/EachCategory`, {
                    state: {
                      subcategory: subcategory,
                    },
                  })
                }
              >
                {subcategory.title}
              </SubcategoryItem>
            );
          })}
        </SubcategoryList>
      )}
    </div>
  );
};

export default SubCategories;
