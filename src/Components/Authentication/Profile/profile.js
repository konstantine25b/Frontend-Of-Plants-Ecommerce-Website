import React, { useContext } from "react";
import styled from "@emotion/styled";
import AuthContext from "../../../Contexts/AuthContext";


const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const UserDetails = styled.div`
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.span`
  font-weight: bold;
`;

const Profile = () => {
  const { user } = useContext(AuthContext);
  

  return (
    <ProfileContainer>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Personal Details
      </h2>
      <UserDetails>
        <p>
          <Label>Username:</Label> {user?.username}
        </p>
        <p>
          <Label>Email:</Label> {user?.email}
        </p>
        <p>
          <Label>First Name:</Label> {user?.first_name}
        </p>
        <p>
          <Label>Last Name:</Label> {user?.last_name}
        </p>
        <p>
          <Label>Phone Number:</Label> {user?.phone_number}
        </p>
        <p>
          <Label>Role:</Label> {user?.role}
        </p>
      </UserDetails>
    </ProfileContainer>
  );
};

export default Profile;
