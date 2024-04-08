import React from "react";
import styled from "@emotion/styled";
import { ArrowRightIcon } from "@heroicons/react/outline";
import COLORS from "../../styles/Colors";
import { useNavigate } from "react-router-dom";
import { subcategoryClient } from "../../../Client/products/SubCategories";
import { useQuery } from "react-query";

const Container = styled.div`
  position: relative;
  background-image: url("https://plnts.com/_next/image?url=https%3A%2F%2Fplnts-api.ams3.digitaloceanspaces.com%2Fmain%2FNieuwe_homepage_banner_2db529dddf.jpg&w=3840&q=80");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 40rem; /* Adjust height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const Content = styled.div`
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, background-color 0.3s ease; /* Added background-color transition */

  &:hover {
    transform: scale(1.1); /* Increase size when hovered over */
    cursor: pointer;
    filter: brightness(110%);
  }
`;

const Title = styled.h1`
  font-size: 3rem; /* Converted from pixels to rems */
  margin-bottom: 1rem;
  letter-spacing: 0.2rem; /* Converted from pixels to rems */
`;

const ArrowIcon = styled(ArrowRightIcon)`
  width: 2.1875rem; /* Converted from pixels to rems */
  height: 2.1875rem; /* Converted from pixels to rems */
  color: ${COLORS.white};
  transition: transform 0.3s ease;
`;

const TitleWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  transition: opacity 0.3s ease;
`;

const Trend = () => {
  const navigate = useNavigate();

  const Id =14// am konretuli trendis ID


  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery(["subcategory", Id], () =>
    subcategoryClient.getSubcategory(Id)
  );
  
  return (
    <Container>
      <Content
        onClick={() =>
          navigate(`/EachCategory`, {
            state: {
              subcategory: data,
            },
          })
        }
      >
        <TitleWrapper>
          <Title>See Soils And Potting mixes</Title>
          <ArrowIcon />
        </TitleWrapper>
      </Content>
    </Container>
  );
};

export default Trend;
