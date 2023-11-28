import React from 'react';
import { styled } from 'styled-components';

export const Content = styled.div`
  width: 393px;
  height: 100%;
  background: #fffcf4;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Question = styled.div`
  width: 393px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

export const Down = styled.div`
  display: flex;
  justify-content: center;
`;

export const Num = styled.div`
  font-weight: 900;
`;

export const PictureContainer = styled.div`
  width: 393px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
`;

export const Pic = styled.div`
  border-radius: 8px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

export const FaceBox = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 65px;
  height: 65px;
  border: 6px dashed #ffffff;
  z-index: 300;
`;

export const BtnContainer = styled.div`
  width: 393px;
  height: 15%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
`;

export const YesBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 36px;

  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  display: flex;
  text-align: center;

  background: #ffc329;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  border: none;
`;

export const NoBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 36px;

  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  display: flex;
  text-align: center;

  background: #dddddd;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  border: none;
`;

export const Friend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 30px;
`;

export const FriendPic = styled.div``;

export const Name = styled.div`
  margin-top: 5px;
  font-family: 'Pretendard';
  font-size: 11px;
`;

export const Container = styled.div`
  width: 273px;
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
