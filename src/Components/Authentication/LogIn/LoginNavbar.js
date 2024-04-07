import styled from "@emotion/styled";
import { UserIcon } from "@heroicons/react/outline"; // Import specific icon from Heroicons
import COLORS from "../../styles/Colors";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../Contexts/AuthContext";

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

const StyledP = styled.div``;

const LoginNavbar = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return (
      <ActionButton onClick={() => navigate(`/Login`)} primary>
        <StyledP>{user.username}</StyledP>
        <IconContainer>
          <UserIcon width="1.3rem" /> {/* User icon */}
        </IconContainer>
      </ActionButton>
    );
  } else {
    return (
      <ActionButton onClick={() => navigate(`/Login`)} primary>
        <IconContainer>
          <UserIcon width="1.3rem" /> {/* User icon */}
        </IconContainer>
        <StyledP>Sign In</StyledP>
      </ActionButton>
    );
  }
};

export default LoginNavbar;
