import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { UserIcon } from "@heroicons/react/outline"; // Import specific icon from Heroicons
import COLORS from "../../styles/Colors";
import UserDropDown from "./UserDropDown";

const Container = styled.div`
  position: relative;
`;

const ActionButton = styled.button`
  border: none;
  display: flex;
  z-index: 50;
  align-items: center;
  border-radius: 0.3125rem; /* Converted from 5px to rem */
  background-color: ${(props) =>
    props.primary
      ? COLORS.fancyBlue
      : COLORS.mainBackground}; /* Use fancy blue for primary action */
  color: ${(props) =>
    props.primary ? "#fff" : COLORS.text}; /* White text for primary action */
  cursor: pointer;
  padding: 0.625rem 1rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.primary ? COLORS.hoverBlue : "#f5f5f5"}; /* Darken on hover */
  }
`;

const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Make the container round */
  margin-left: 0.5rem;
  background-color: ${COLORS.fancyBlue};
  cursor: pointer; /* Add cursor pointer on hover */
  transition: transform 0.3s; /* Add transition effect */

  &:hover {
    transform: scale(1.1); /* Scale up on hover */
  }
`;

const ToggleUser = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={ref}>
      <ActionButton primary onClick={() => setIsOpen((prev) => !prev)}>
        {user.username}
        <IconContainer>
          <UserIcon width="1.3rem" /> {/* User icon */}
        </IconContainer>
      </ActionButton>
      {isOpen && <UserDropDown user ={user}/>}
    </Container>
  );
};

export default ToggleUser;
