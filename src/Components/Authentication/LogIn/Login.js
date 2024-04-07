import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import AuthContext from "../../../Contexts/AuthContext";
import COLORS from "../../styles/Colors";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 0.3rem;
  border: 1px solid ${COLORS.gray};
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.3rem;
  background-color: ${COLORS.fancyBlue};
  color: ${COLORS.white};
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${COLORS.hoverBlue};
  }

  &:disabled {
    background-color: ${COLORS.gray};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${COLORS.fancyRed};
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const NoAccount = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  text-align: center;
`;

const CreateAccountLink = styled.span`
  color: ${COLORS.fancyBlue};
  cursor: pointer;
  &:hover {
    color: ${COLORS.hoverBlue};
  }
`;

const Dropdown = styled.select`
  padding: 0.8rem;
  border-radius: 0.3rem;
  border: 1px solid ${COLORS.gray};
  font-size: 1rem;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Customer");

  const handleLogin = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true); // Set loading state to true
    try {
    
      await login(username, password, selectedRole);
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <LoginContainer>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Hi, Welcome!</h2>
      <LoginForm onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <Label>Login As:</Label>
        <Dropdown
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="Customer">Customer</option>
          <option value="Vendor">Vendor</option>
        </Dropdown>
        <Button type="submit" disabled={loading}>
          {" "}
          {/* Disable button when loading */}
          {loading ? "Logging in..." : "Login"}{" "}
          {/* Change button text based on loading state */}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
      <NoAccount>
        No account yet?{" "}
        <CreateAccountLink onClick={() => navigate("/SignUp")}>
          Create one here!
        </CreateAccountLink>
      </NoAccount>
    </LoginContainer>
  );
};

export default Login;
