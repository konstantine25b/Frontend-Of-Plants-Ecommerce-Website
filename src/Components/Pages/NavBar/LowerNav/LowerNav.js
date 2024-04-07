import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import COLORS from "../../../styles/Colors";
import EachCategory from "./EachCategory";

const Container = styled.div`
  position: fixed;
  top: 4.25rem;
  z-index: 2;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  height: 2.5rem;
  border-top: 0.5px solid black;
  background-color: ${COLORS.main};
  box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    display: none; /* Display the menu button for medium screens */
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  width: 70%;
  justify-content: left;
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 1rem;
`;

const Link = styled.a`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${COLORS.text};
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const LowerNav = ({ categories }) => {
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
    <Container ref={lowerNavRef}>
      <CategoryList>
        {categories?.map((category, index) => (
          <EachCategory
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
    </Container>
  );
};

export default LowerNav;
