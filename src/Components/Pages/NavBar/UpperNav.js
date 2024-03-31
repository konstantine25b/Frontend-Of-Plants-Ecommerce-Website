import styled from "@emotion/styled";
import {
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
} from "@heroicons/react/outline"; // Import specific icon from Heroicons
import Logo from "./KosaPlants_logo.png"; // Make sure to provide the correct path to your logo image
import COLORS from "../../styles/Colors";

// Define a common size for icons
const iconSize = "1.5rem"; // Converted from 24px to rem assuming 16px base font size

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem; /* Converted from 10px to rem */
  background-color: ${COLORS.main}; /* Use main color as background */
  box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.1); /* Converted from 0px 2px 4px rgba(0, 0, 0, 0.1) to rem */
`;

const LogoImg = styled.img`
  width: 7.5rem; /* Converted from 120px to rem */
  height: auto; /* Maintain aspect ratio */
  cursor: pointer; /* Add cursor pointer on hover */
  transition: transform 0.3s; /* Add transition effect */
  margin-left: 0.625rem; /* Converted from 1% to rem */
  &:hover {
    transform: scale(1.1); /* Scale up on hover */
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 60%;
`;

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
  width: ${iconSize};
  height: ${iconSize};
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.625rem; /* Converted from 2% to rem */
`;

const ActionButton = styled.button`
  padding: 0.625rem 1.25rem; /* Converted from 10px 20px to rem */
  margin-left: 0.625rem; /* Converted from 10px to rem */
  border: none;
  margin-right: 1rem;
  border-radius: 0.3125rem; /* Converted from 5px to rem */
  background-color: ${(props) =>
    props.primary
      ? COLORS.fancyBlue
      : "#fff"}; /* Use fancy blue for primary action */
  color: ${(props) =>
    props.primary ? "#fff" : COLORS.text}; /* White text for primary action */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.primary ? COLORS.hoverBlue : "#f5f5f5"}; /* Darken on hover */
  }
`;

const IconContainer = styled.div`
  width: ${iconSize};
  height: ${iconSize};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Make the container round */
  padding: 0rem 0.4rem;
  cursor: pointer; /* Add cursor pointer on hover */
  transition: transform 0.3s; /* Add transition effect */

  &:hover {
    transform: scale(1.1); /* Scale up on hover */
  }
`;

const ShoppingCartIconContainer = styled.div`
  position: relative;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -0.7rem;
  right: -0.5rem;
  background-color: ${COLORS.text};
  color: ${COLORS.text};
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const UpperNavBar = () => {
  // Placeholder for the number of items in the shopping cart
  const itemsInCart = 5;

  return (
    <Container>
      <LogoImg src={Logo} alt="KosaPlants Logo" />
      <SearchBarContainer>
        <SearchBar type="text" placeholder="Search KosaPlants..." />
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
      </SearchBarContainer>
      <ActionsContainer>
        <ActionButton primary>
          <IconContainer>
            <UserIcon /> {/* User icon */}
          </IconContainer>
        </ActionButton>
        <ActionButton>
          <ShoppingCartIconContainer>
            <IconContainer primary>
              <ShoppingCartIcon color={COLORS.fancyBlue} />{" "}
              {/* Shopping cart icon */}
            </IconContainer>
            <ItemCount>{itemsInCart}</ItemCount>
          </ShoppingCartIconContainer>
        </ActionButton>
      </ActionsContainer>
    </Container>
  );
};

export default UpperNavBar;
