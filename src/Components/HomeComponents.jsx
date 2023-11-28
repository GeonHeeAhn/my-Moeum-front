import React from 'react';
import { styled } from 'styled-components';

export const Content = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopBar = styled.div`
  height: 170px;
`;

export const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 120;
  font-size: 20px;
  margin-top: 50px;
`;

export const FriendTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 120;
  font-size: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Alert = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  position: relative;
`;

export const Text = styled.div`
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  right: 95px;
  bottom: 27px;
`;

export const LogoC = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80px;
`;

export const Balloon = styled.div``;

export const Gallery = styled.div`
  width: 350px;
  height: 650px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  max-height: 650px;
  margin-bottom: 100px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: auto;
`;

export const Photo = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 15px;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  margin-left: 2%;
  margin-right: 2%;
  height: 280px;
  margin-top: 1.5%;
`;

export const Left = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Right = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Album = styled.div`
  width: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
