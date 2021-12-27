import React from "react";
// import style from './Country.module.css'
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 430px;
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(0, e, e, 0.2);
  overflow: hidden;
  margin: 20px;
  text-align: center;
  transition: all 0.25;
  background-color: #cddfee;
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
  & img {
    width: 330px;
    height: 220px;
  }
  & h3 {
    font-weight: 700;
  }
`;
const Continent = styled.p`
  padding: 0 1rem;
  font-size: 16px;
  font-weight: 400;
`;
const Info = styled.p`
  font-weight: 500;
  text-decoration: none;
  color: rgb(79, 56, 122);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

export function Country({
  name,
  id,
  image,
  continent,
  capital,
  subregion,
  area,
  population,
}) {
  return (
    <Card>
      <img src={image} alt="" />
      <h3>{name}</h3>
      <Continent>{continent}</Continent>
      <StyledLink to={`/countries/${id}`}>
        <Info>Get info</Info>
      </StyledLink>
    </Card>
  );
}
