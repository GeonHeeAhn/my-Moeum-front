import styled from "styled-components";

export const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #12121266;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  position: fixed;
  width: 315px;
  height: 117px;
  border-radius: 18px;
  border: 1px;
  border: 1px solid #dddddd;
  bottom: 195px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  background: #ffffff;
`;

export const ModalBtn = styled.button`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.20000000298023224px;
  text-align: center;
  border: none;
  background: transparent;
  color: #333333;
  height: 55px;
  outline: none;
`;

export const ExitBtn = styled.button`
  position: fixed;
  width: 315px;
  height: 55px;
  bottom: 125px;
  border-radius: 18px;
  border: 1px;
  border: 1px solid #dddddd;
  color: #ef4914;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.20000000298023224px;
  background: #ffffff;
  outline: none;
`;

export const PhotoInput = styled.input``;
