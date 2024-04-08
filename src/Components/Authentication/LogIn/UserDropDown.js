import COLORS from "../../styles/Colors";
import styled from "@emotion/styled";
import { LogoutIcon, UserIcon, ViewListIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import AuthContext from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const OptionsContainer = styled.div`
  position: absolute;
  z-index: 50;
  top: 3.3rem;
  left: 0rem;
  transform: translateX(-50%);
  width: 12rem;
  background-color: ${COLORS.mainBackground};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 9rem;
    left: 0rem;
  }
`;

const Option = styled.button`
  border: none;
  background-color: transparent;
  color: ${COLORS.text};
  padding: 0.5rem 1rem;
  margin-bottom: 0.3rem;
  width: 100%;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const OptionText = styled.span`
  margin-left: 1rem;
  font-size: 0.8rem;
  display: flex;
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserDropDown = () => {
  let { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function when the button is clicked
    navigate("/LogIn");
  };

  return (
    <OptionsContainer>
      <Option onClick={() => navigate("/Profile")}>
        <IconContainer>
          <UserIcon width="1.5rem" />
        </IconContainer>
        <OptionText>Account Details</OptionText>
      </Option>
      <Option onClick={() => navigate("/MyOrders")}>
        <IconContainer>
          <ViewListIcon width="1.5rem" />
        </IconContainer>
        <OptionText>My Orders</OptionText>
      </Option>
      <Option onClick={handleLogout}>
        <IconContainer>
          <LogoutIcon width="1.5rem" />
        </IconContainer>
        <OptionText>Logout</OptionText>
      </Option>
    </OptionsContainer>
  );
};

export default UserDropDown;
