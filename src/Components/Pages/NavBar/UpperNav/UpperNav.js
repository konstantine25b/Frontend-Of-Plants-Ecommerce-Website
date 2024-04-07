import styled from "@emotion/styled";
import { ShoppingCartIcon } from "@heroicons/react/outline"; // Import specific icon from Heroicons
import Logo from "./KosaPlants_logo.png"; // Make sure to provide the correct path to your logo image
import COLORS from "../../../styles/Colors";
import { MenuIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import { useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import { selectCartItems } from "../../../../Redux/Cart";
import { useSelector } from "react-redux";
import LoginNavbar from "../../../Authentication/LogIn/LoginNavbar";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem; /* Converted from 10px to rem */
  background-color: ${COLORS.main}; /* Use main color as background */
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

  @media (max-width: 500px) {
    display: none;
  }
  @media (max-width: 768px) {
    width: 5rem; /* Adjust height for smaller screens */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 6.5rem; /* Adjust height for medium screens */
    margin-left: 0.225rem; /* Converted from 1% to rem */
  }

  @media (min-width: 1025px) {
    width: 7.5rem; /* Adjust height for large screens */
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.625rem; /* Converted from 2% to rem */
`;

const ActionButton = styled.button`
  margin-left: 0.625rem; /* Converted from 10px to rem */
  border: none;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  border-radius: 0.3125rem; /* Converted from 5px to rem */
  background-color: ${(props) =>
    props.primary
      ? COLORS.fancyBlue
      : COLORS.mainBackground}; /* Use fancy blue for primary action */
  color: ${(props) =>
    props.primary ? "#fff" : COLORS.text}; /* White text for primary action */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.primary ? COLORS.hoverBlue : "#f5f5f5"}; /* Darken on hover */
  }

  @media (max-width: 768px) {
    padding: 0.625rem 0.7rem; /* Converted from 10px 20px to rem */
    margin-left: 0.125rem; /* Converted from 10px to rem */
    margin-right: 0.5rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0.625rem 1rem; /* Converted from 10px 20px to rem */
    margin-left: 0.225rem; /* Converted from 10px to rem */
    margin-right: 0.7rem;
  }

  @media (min-width: 1025px) {
    padding: 0.625rem 1.25rem; /* Converted from 10px 20px to rem */
    margin-left: 0.625rem; /* Converted from 10px to rem */
  }
`;

const IconContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
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
  @media (max-width: 768px) {
    width: 1.2rem;
    height: 1.2rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 1.2rem;
    height: 1.2rem;
  }

  @media (min-width: 1025px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ShoppingCartIconContainer = styled.div`
  position: relative;
`;
const StyledP = styled.div``;

const ItemCount = styled.span`
  position: absolute;
  top: -0.7rem;
  right: -0.5rem;
  background-color: ${COLORS.text};
  color: ${COLORS.fancyBlue};
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;
const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: 0.5rem;
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const UpperNavBar = ({ categories }) => {
  // Placeholder for the number of items in the shopping cart
  const [showMenu, setShowMenu] = useState(false);
  const [itemsInCart, setItemsInCart] = useState(0);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();

  const items = useSelector((state) => selectCartItems(state));
  useEffect(() => {
    if (items) {
      setItemsInCart(items?.length);
    }
  }, [items]);

  return (
    <Container>
      <MenuButton onClick={toggleMenu}>
        <MenuIcon width={35} height={35} color={COLORS.text} />
      </MenuButton>
      <LogoImg onClick={() => navigate(`/`)} src={Logo} alt="KosaPlants Logo" />
      <Search />
      <ActionsContainer>
        <LoginNavbar />
        <ActionButton onClick={() => navigate(`/Cart`)}>
          <ShoppingCartIconContainer>
            <IconContainer primary>
              <ShoppingCartIcon width="1.3rem" color={COLORS.black} />{" "}
              {/* Shopping cart icon */}
            </IconContainer>
            <ItemCount>{itemsInCart}</ItemCount>
          </ShoppingCartIconContainer>
        </ActionButton>
      </ActionsContainer>
      {showMenu && (
        <ToggleMenu setShowMenu={setShowMenu} categories={categories} />
      )}
    </Container>
  );
};

export default UpperNavBar;
