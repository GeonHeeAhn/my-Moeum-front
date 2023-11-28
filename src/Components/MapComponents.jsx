import { styled } from 'styled-components';

export const Content = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

export const TopBar = styled.div`
  height: 110px;
`;

export const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 120;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 80px;
`;

export const MapDiv = styled.div`
  position: absolute;
  z-index: 0;

  margin-top: 12vh;
`;

export const MoeumDiv = styled.div`
  width: 100vw;
  height: 50vh;
  background: #ffffff;
  box-shadow: 0px -4px 4px -2px rgba(0, 0, 0, 0.25);
  border-radius: 48px 48px 0px 0px;
  position: absolute;
  z-index: 1;

  margin-top: 48vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
`;

export const Moeum = styled.div`
  width: 273px;
  height: 148.75px;
  margin-top: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Photo = styled.div`
  width: 100px;
  height: 148.75px;
  border-radius: 30px;
`;

export const Info = styled.div`
  width: 124px;
  height: 148.75px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Date = styled.div`
  font-family: 'Arial';
  font-weight: 400;
  font-size: 12px;
  color: #333333;
  text-align: right;
`;

export const Friends = styled.div`
  font-family: 'Arial';
  font-weight: 400;
  font-size: 12px;
  color: #333333;
  text-align: right;
`;

export const Place = styled.div`
  font-family: 'Arial';
  font-weight: 400;
  font-size: 12px;
  color: #333333;
  text-align: right;
`;

export const Dday = styled.div`
  margin-top: 30px;

  font-family: 'Arial';
  font-weight: 550;
  font-size: 12px;
  color: #333333;
  text-align: right;
`;
