import styled from "@emotion/styled";
import COLORS from "../../styles/Colors";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientCustomers } from "../../../Client/users/Customer";
import { clientVendors } from "../../../Client/users/Vendor";
import AuthContext from "../../../Contexts/AuthContext";

const SignupContainer = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
`;

const SignupForm = styled.form`
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

const Select = styled.select`
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

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (username, password, selectedRole) => {
    try {
      await login(username, password, selectedRole);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.role == "Customer") {
      clientCustomers
        .createCustomer(formData)
        .then((createdCustomer) => {
          if (createdCustomer) {
            console.log("New customer created:", createdCustomer);
            handleLogin(formData.username, formData.password,formData.role);
          } else {
            console.error("Failed to create customer");
          }
        })
        .catch((error) => {
          console.error("Error creating customer:", error.message);
        });
    } else {
      clientVendors
        .createVendor(formData)
        .then((createdVendor) => {
          if (createdVendor) {
            console.log("New vendor created:", createdVendor);
          } else {
            console.error("Failed to create vendor");
          }
        })
        .catch((error) => {
          console.error("Error creating vendor:", error.message);
        });
    }
  };

  return (
    <SignupContainer>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Sign Up</h2>
      <SignupForm onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="username">Username:</Label>
          <Input type="text" id="username" onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="first_name">First Name:</Label>
          <Input type="text" id="first_name" onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="last_name">Last Name:</Label>
          <Input type="text" id="last_name" onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="phone_number">Phone Number:</Label>
          <Input
            type="tel"
            id="phone_number"
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="role">Role:</Label>
          <Select id="role" onChange={handleChange}>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </Select>
        </FormField>
        <Button type="submit">Sign Up</Button>
      </SignupForm>
      <NoAccount>
        Already have an account?{" "}
        <CreateAccountLink onClick={() => navigate("/LogIn")}>
          Sign in here!
        </CreateAccountLink>
      </NoAccount>
    </SignupContainer>
  );
};

export default Signup;
