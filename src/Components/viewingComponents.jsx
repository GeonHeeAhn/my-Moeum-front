import React from "react";
import { styled } from "styled-components";

export const ContentContainer = styled.div`
    margin-top:30px;
`;

export const Content = styled.div`
width: 393px;
height: 852px;
display: flex;
flex-direction: column;
align-items: center; 
background: #fffcf4;
`;

export const MiniContainer = styled. div`
display: flex;
flex-wrap: wrap;
flex-direction: center;
justify-content: center;
width: 324px;
height: 580px;
/* moWhite */
background: #FFFFFF;
/* moWhite */
border: 1px solid #FFFFFF;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
border-radius: 15px;
`;

export const ImgContainer = styled.div`
width: 220px;
height: 320px;
left: 86px;
top: 145px;
padding-top: 10px;

background: url(IMG_0553.png);
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
border-radius: 8px;
`;


export const SecondaryTitle = styled.div`
width: 260px;
height: 35px;
left: 66px;
top: 488px;

font-family: 'Arial';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;

/* moDarkGray */
color: #333333;
`
;

export const ShareBtn = styled.button`
width: 22px;
height: 22px;
left: 299px;
top: 494px;
background: transparent;
border: none;
`
;

export const Text = styled.div`
width: 251px;
height: 50px;
left: 66px;
top: 526px;

font-family: 'Arial';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* or 133% */

/* moDarkGray */
color: #333333;
`
;

export const Date = styled.div`
width: 142px;
height: 21px;
left: 179px;
top: 654px;
margin-left: 70%;

font-family: 'Sue Ellen Francisco';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 35px;
`
;

export const Delete = styled.button`
width: 55px;
height: 22px;
left: 303px;
top: 712px;
margin-left: 80%;
margin-top:4%;

font-family: 'Arial';
font-weight: 600;
font-size: 12px;
line-height: 15px;
background: transparent;
border: none;
text-decoration-line: underline;

/* moDeepGray */
color: #808080;
`
;
