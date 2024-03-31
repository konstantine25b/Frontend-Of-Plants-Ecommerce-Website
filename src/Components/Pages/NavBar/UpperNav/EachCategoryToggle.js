import styled from "@emotion/styled";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import COLORS from "../../../styles/Colors";
import SubCategoriesToggle from "./SubCategoriesToogle";

const CategoryItem = styled.li`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${COLORS.text};
  text-transform: uppercase;
  transition: color 0.3s, border-bottom-color 0.3s; /* Add transition effect for underline */
  display: flex;
  padding-bottom: 0.2rem;
  align-items: center;
  position: relative; /* Position relative for absolutely positioning the additional div */

  &:hover > span {
    color: ${COLORS.primary}; /* Apply hover effect only to the category title */
    cursor: pointer;
  }

  &.active {
    border-bottom: 1px solid ${COLORS.primary}; /* Add underline for active category */
  }
`;

const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
`;

const Title = styled.span`
  flex: 1; /* Allow the title to take up remaining space */
`;

const EachCategoryToggle = ({
  activeCategory,
  handleCategoryClick,
  category,
  index,
}) => {
  return (
    <>
      <CategoryItem
        key={index}
        className={activeCategory === index ? "active" : ""}
        isOpen={activeCategory === index}
        onClick={() => {
          handleCategoryClick(index);
        }}
      >
        <Title>{category.title} </Title>
        <IconContainer>
          {activeCategory === index ? (
            <ChevronUpIcon className="h-4 w-4" /> // Arrow up icon if category is active
          ) : (
            <ChevronDownIcon className="h-4 w-4" /> // Arrow down icon if category is not active
          )}
        </IconContainer>
      </CategoryItem>
      {activeCategory === index && <SubCategoriesToggle Id={category.id} />}
    </>
  );
};

export default EachCategoryToggle;
