import styled from "styled-components";

export const CommentSection = styled.div`
margin-top: 25px;
border-top: 0.7px solid #808080;
width: 100vw;
background: #fffcf4;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center; 
`;

export const Comments = styled.div`
margin-top: 25px;
width: 300px;
margin-bottom: 80px;
`;

export const Comment = styled.div`
width: 300px;
height: 70px;

display: flex;
`;

export const ProfilePicture = styled.div`
width: 38px;
height: 38px;

background: #AFE397;

border-radius:50px;

display: flex;
justify-content: center;
align-items: center; 

`;

export const CommentContents = styled.div`
margin-left: 15px;
`;
export const Nickname = styled.div`
width: 90px;
height: 12px;

margin-top: 2px;
font-family: 'Arial';
font-weight: 700;
font-size: 12px;

/* moDeepGray */
color: #808080;
`;

export const CommentContent = styled.div`
width: 208px;
height: 16px;

margin-top: 5px;

font-family: 'Arial';
font-weight: 700;
font-size: 14px;
letter-spacing: -0.1px;

color: #333333;
`;

export const CommentDate = styled.div`
`;

export const CommentInputContainer = styled.div`
    position: fixed;
    height: 100px;
    bottom: 0;
    left: 0;
    width: 100%;

    background: #fffcf4;
    display: flex;
    justify-content: space-evenly;
    align-items: center; 
`;

export const CommentInput = styled.input`
    width: 280px;
    height: 44px;
    box-sizing: border-box;
    border: 1px solid #BDBDBD;
    border-radius: 50px;

    padding-left: 25px;

    font-family: 'Arial';
    font-weight: 400;
    font-size: 14px;

`;

export const CommentButton = styled.button`
background: #FFC329;
width: 40px;
height: 37px;
border-radius: 45px;
border:none;

display: flex;
justify-content: center;
align-items: center; 
`;



