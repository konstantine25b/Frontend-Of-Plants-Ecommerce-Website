import { Outlet } from "react-router-dom";
import NavBar from "./Components/Pages/NavBar/NavBar";
import styled from "@emotion/styled";
import { AuthProvider } from "./Contexts/AuthContext";
import COLORS from "./Components/styles/Colors";

const Gap = styled.div`
  margin-top: 7.8rem;
  @media (max-width: 1024px) {
    margin-top: 4.4rem; /* Display the menu button for medium screens */
  }
`;
const StyledWrapper = styled.div`
  background-color: ${COLORS.mainBackground};
`;
export default function Root() {
  return (
    <AuthProvider>
      <NavBar />
      <Gap />
      <StyledWrapper>
        <Outlet />
      </StyledWrapper>
    </AuthProvider>
  );
}
