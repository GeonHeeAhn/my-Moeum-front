import { styled } from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";
import BackIcon from '../Assets/icons/goback.png';

export const Back = () => {
  const navigate = useNavigate();


  return (
    <StyledBackButton onClick={() => {navigate(-1)}}>
      <img src={BackIcon} alt="뒤로가기" />
    </StyledBackButton>
  );
};

export const Back2 = () => {
  const navigate = useNavigate();


  return (
    <StyledBackButton2 onClick={() => {navigate(-1)}}>
      <img src={BackIcon} alt="뒤로가기" />
    </StyledBackButton2>
  );
};

export const TopBar = styled.div`
display: flex;
position:relative;
`;
export const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 400;
  color: #333333;
  margin-top: 50px;
`;

export const StyledBackButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background:transparent;
  position:absolute;
  right:180px;
  top: 47px;
`;

export const StyledBackButton2 = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background:transparent;
  position:absolute;
  left: 20px;
  top: 47px;
`;
