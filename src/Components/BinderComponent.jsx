import { styled } from 'styled-components';

export const Content = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopBar = styled.div`
  height: 95px;
`;

export const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 120;
  font-size: 20px;
  margin-top: 50px;
`;

export const Gallery = styled.div`
  width: 350px;
  height: 650px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
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
  margin-top: 20px;
  margin-bottom: 10px;
  float: left;
  margin: 2.5%;
`;

export const Bind = styled.div`
  filter: drop-shadow(0px 2.5px 2.5px rgba(0, 0, 0, 0.25));
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Spine = styled.div`
  width: 13px;
  height: 145px;
  border-radius: 6px 0px 0px 6px;

  position: absolute;
  z-index: 2;
`;

export const Cover = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 6px;

  position: absolute;

  z-index: 0;
`;

export const Name = styled.div`
  margin-top: 10px;

  font-family: 'Arial';
  font-weight: 700;
  font-size: 14.5px;
  color: #333333;
`;

export const Pic = styled.div`
  position: absolute;
  z-index: 50;
  left: 40px;
  top: 13px;
`;
