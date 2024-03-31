import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import { useEffect, useRef, useState } from "react";
import EachCategoryToggle from "./EachCategoryToggle";

const MenuContainer = styled.div`
  position: absolute;
  top: 4.25rem;
  right: 0;
  background-color: ${COLORS.main};
  padding: 1rem; /* Adjust padding for smaller sizes */
  height: 100vh;
  width: 60%; /* Adjust width for smaller sizes */
  z-index: 10;
  border-radius: 1rem;
  box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.3);
  @media (max-width: 400px) {
    width: 75%; /* Adjust width for screens up to 400px */
  }
  @media (min-width: 401px) and (max-width: 768px) {
    width: 55%; /* Adjust width for screens between 401px and 768px */
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 40%; /* Adjust width for screens between 769px and 1024px */
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavigationLinks = styled.div`
  margin-top: 1.5rem;
`;

const Link = styled.a`
  display: block;
  font-size: 0.9rem; /* Decrease font size for smaller sizes */
  font-weight: bold;
  color: ${COLORS.text};
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0.5rem 0;

  &:hover {
    color: ${COLORS.primary};
  }
  @media (min-width: 768px) {
    font-size: 1rem; /* Adjust font size for medium sizes */
  }
`;

const ToggleMenu = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const lowerNavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (lowerNavRef.current && !lowerNavRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };
  return (
    <MenuContainer ref={lowerNavRef}>
      <CategoryList>
        {categories?.map((category, index) => (
          <EachCategoryToggle
            key={index}
            category={category}
            index={index}
            handleCategoryClick={handleCategoryClick}
            activeCategory={activeCategory}
          />
        ))}
      </CategoryList>
      <NavigationLinks>
        <Link>About Us</Link>
        <Link>Contact</Link>
      </NavigationLinks>
    </MenuContainer>
  );
};

export default ToggleMenu;
