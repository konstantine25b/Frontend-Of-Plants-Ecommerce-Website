import styled from "@emotion/styled";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import COLORS from "../../styles/Colors";

const CategoryItem = styled.li`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${COLORS.text};
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s, border-bottom-color 0.3s; /* Add transition effect for underline */
  display: flex;
  align-items: center;

  &:hover {
    color: ${COLORS.primary};
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

const EachCategory = ({
  activeCategory,
  handleCategoryClick,
  category,
  index,
}) => {
  return (
    <CategoryItem
      key={index}
      className={activeCategory === index ? "active" : ""}
      onClick={() => handleCategoryClick(index)}
    >
      {category.title}{" "}
      <IconContainer>
        {activeCategory === index ? (
          <ChevronUpIcon className="h-4 w-4" /> // Arrow up icon if category is active
        ) : (
          <ChevronDownIcon className="h-4 w-4" /> // Arrow down icon if category is not active
        )}
      </IconContainer>
    </CategoryItem>
  );
};

export default EachCategory;
