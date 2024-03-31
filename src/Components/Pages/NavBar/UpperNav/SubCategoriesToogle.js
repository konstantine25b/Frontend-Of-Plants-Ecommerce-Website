import { subcategoryClient } from "../../../../Client/products/SubCategories";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import { useNavigate } from "react-router-dom";

const SubcategoryList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  padding-bottom: 0.4rem;
  border-bottom: 0.1px solid ${COLORS.gray}; /* Add border bottom */
`;

const SubcategoryItem = styled.li`
  padding: 0.3rem 0.4rem; /* Add padding */
  font-size: 0.9rem;
  &:hover {
    color: ${COLORS.hoverBlue};
    cursor: pointer;
  }
`;

const SubCategoriesToggle = ({ Id }) => {
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
          {subcategories.results?.map((subcategory) => (
            <SubcategoryItem
              onClick={() =>
                navigate(`/EachCategory`, {
                  state: {
                    subcategory: subcategory,
                  },
                })
              }
              key={subcategory.id}
            >
              {subcategory.title}
            </SubcategoryItem>
          ))}
        </SubcategoryList>
      )}
    </div>
  );
};

export default SubCategoriesToggle;
