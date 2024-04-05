import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import AllProductList from "./AllProductsList";

const AllProductsContainer = styled.section`
  padding: 3rem 0;
  background-color: #f7f7f7;
  text-align: center;
`;

const Title = styled.div`
  display: block;
  font-size: 2.25rem;
  color: ${({ showSeeAll }) => (showSeeAll ? "#555" : "#333")};
  margin-bottom: 1.5rem;
  position: relative;
  transition: color 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    bottom: -0.125rem;
    left: 50%;
    width: 0;
    height: 0.1875rem;
    background-color: ${({ showSeeAll }) => (showSeeAll ? "#555" : "#333")};
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover {
    color: ${({ showSeeAll }) => (showSeeAll ? "#888" : "#555")};
    cursor: pointer;

    &:before {
      width: 100%;
      left: 0;
    }
  }
`;

const AllProducts = ({ data }) => {
  const [showSeeAll, setShowSeeAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSliceCount = () => {
    if (windowWidth < 390) return 1;
    if (windowWidth < 768) return 2;
    if (windowWidth < 1024) return 3;
    return 4;
  };

  return (
    <AllProductsContainer>
      <Title
        onClick={() => navigate(`/AllProducts`)}
        showSeeAll={showSeeAll}
        onMouseEnter={() => setShowSeeAll(true)}
        onMouseLeave={() => setShowSeeAll(false)}
      >
        {showSeeAll ? "See All Products" : "All Products"}
      </Title>
      <AllProductList data={data} getSliceCount={getSliceCount} />
    </AllProductsContainer>
  );
};

export default AllProducts;
