import { styled } from "styled-components";
import Logo from "../Assets/logo.png";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BackgroundContainer from "../Components/BackgroundContainer";

export const Entrance = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1500); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Background>
        <img src={Logo} alt="로고" width="75vw" />
        <LogoText>MOEUM</LogoText>
    </Background>
  );
};

export default Entrance;

export const Background = styled(BackgroundContainer)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #fffcf4;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffe8a6;
`;
export const LogoText = styled.div`
  padding-top: 0.4vw;
  font: 1rem "Pretendard";
  text-align: center;
  font-size: 5vw;
`;
