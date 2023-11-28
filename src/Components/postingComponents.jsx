import React from "react";
import { styled } from "styled-components";

export const SmallerTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #333333;
  width: 100%;
  background: transparent;
  margin: 3em 0px 5px 0px;
`;

export const InsertBtn = styled.button``;

export const TxtBox = styled.input`
  margin: 5px 0px 5px 0px;
  outline: none;
  border: none;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  height: 21px;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  background: transparent;
  color: #333333;
  text-decoration: underline;
  text-decoration-color: #bdbdbd;
  ::placeholder {
    color: #bdbdbd;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  color: #333333;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  background: transparent;
  outline: none;
  text-align: left;
  border: none;
  resize: none;
  height: 100px;
  padding-bottom: 100px;
`;

export const Friend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  margin-left: 15px;
  margin-top:20px;
`;

export const FriendPic = styled.div``;

export const Name = styled.div`
  margin-top: 5px;
  font-family: 'Pretendard';
  font-size: 11px;
`;

export const FContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`;