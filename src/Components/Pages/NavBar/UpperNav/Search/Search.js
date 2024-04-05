import { SearchIcon } from "@heroicons/react/outline";
import styled from "@emotion/styled";
import COLORS from "../../../../styles/Colors";

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
const SearchBarContainer = styled.div`
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

const Search = () => {
  return (
    <SearchBarContainer>
      <SearchBar type="text" placeholder="Search KosaPlants..." />
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>
    </SearchBarContainer>
  );
};

export default Search;
