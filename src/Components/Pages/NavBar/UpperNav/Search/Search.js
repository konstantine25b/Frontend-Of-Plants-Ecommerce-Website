import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import styled from "@emotion/styled";
import COLORS from "../../../../styles/Colors";
import { clientProduct } from "../../../../../Client/products/Product";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const SearchBar = styled.input`
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 1rem; /* Converted from 10px 40px 10px 10px to rem */
  border: 0.0625rem solid ${COLORS.secondary}; /* Converted from 1px to rem */
  border-radius: 0.3125rem; /* Converted from 5px to rem */
  margin: 0 1.25rem 0 0; /* Converted from 0 20px 0 0 to rem */
  outline: none; /* Remove default focus styles */
  background-color: ${COLORS.background}; /* Set background color */
  color: ${COLORS.text}; /* Set text color */
  position: relative; /* Set position to relative */
  transition: border-color 0.3s; /* Add transition effect */

  &:focus {
    border-color: ${COLORS.primary}; /* Change border color on focus */
  }
`;

const SearchIconContainer = styled.div`
  position: absolute;
  right: 1.875rem; /* Converted from 30px to rem */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

const SearchBarContainer = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 60%;

  @media (max-width: 768px) {
    width: 50%; /* Adjust height for smaller screens */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 53%; /* Adjust height for medium screens */
  }

  @media (min-width: 1025px) {
    width: 60%; /* Adjust height for large screens */
  }
`;

const fetchData = async (
  title = undefined,
  sizeFilter = undefined,
  price__gte = undefined,
  price__lte = undefined,
  page = 1,
  dataInfo = [],
  prevPage = 1
) => {
  try {
    const response = await clientProduct.listProducts(
      {
        title: title,
        size: sizeFilter,
        price__gte: price__gte,
        price__lte: price__lte,
      },
      page,
      dataInfo,
      prevPage
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [size, setSize] = useState();
  const [price, setPrice] = useState({
    price_gte: undefined,
    price_lte: undefined,
  });
  const { data, refetch } = useQuery(
    ["searchedProducts", currentPage, size, price],
    () => fetchData(searchTerm),
    { enabled: false }
  );

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    refetch(); // Refresh data
    navigate(`/SearchPage`, {
      state: {
        title: searchTerm,
      },
    });
  };

  return (
    <SearchBarContainer onSubmit={handleSubmit}>
      <SearchBar
        type="text"
        placeholder="Search KosaPlants..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <SearchIconContainer onClick={handleSubmit}>
        <SearchIcon />
      </SearchIconContainer>
      {/* Display search results here */}
      {data &&
        Array.isArray(data) &&
        data.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
          </div>
        ))}
    </SearchBarContainer>
  );
};

export default Search;
