import { styled } from "styled-components";

export const Content = styled.div`
    width: 393px;
    height: 852px;
    display: flex;
    flex-direction: column;
    align-items: center; 
`
;

export const TopBar = styled.div`
    height: 95px;
`
;

export const Title = styled.div`
    font-family: 'Arial';
    font-style: normal;
    font-weight: 120;
    font-size: 20px;
    margin-top: 50px;
`
;

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    width: 302px;
    height: 73px;

    margin-top: 2.2em;
`
;

export const PhotoDiv = styled.div`
    width: 73px;
    height: 73px;
`
;

export const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100px;
    height: 48px;
`
;

export const NickEdit = styled.input`
    width: 98px;
    height: 35px;
    border-radius: 15px;
    border:none;
    background: #FFE8A6;
    padding-left: 13px;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 350;
    font-size: 14px;
    color: #333333;
`
;

export const Nickname = styled.div`
    width: 98px;
    height: 22px;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 450;
    font-size: 19px;

    color: #333333;
`
;

export const ID = styled.div`
    width: 98px;
    height: 24px;
    padding-top:5px;

    font-family: 'Arial';
    font-style: normal;
    font-weight: 200;
    font-size: 11px;
    color: #333333;
`
;

export const EditBtn = styled.button`
    width: 53px;
    height: 28px;
    background: #DDDDDD;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    font-family: 'Arial';
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    display: row;
    align-items: center;
    text-align: center;
    color: #333333;

    border: none;
`
;

export const ComBtn = styled.button`
    width: 53px;
    height: 28px;
    background: #FFC329;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    font-family: 'Arial';
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    display: row;
    align-items: center;
    text-align: center;
    color: #333333;

    border: none;
`
;

export const Menus = styled.div`
    width: 280px;
    height: 250px;

    margin-top: 3.5em;
`
;

export const Menu = styled.div`
    width: 280px;
    height: 40px;

    font-family: 'Abhaya Libre';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.2px;

    display: flex;
    flex-direction: row;
    align-items: center; 

    color: #333333;
`
;

export const Line = styled.div`
    width: 280px;

    border: 0.5px solid #DDDDDD;
    margin-top: 0.3em;
    margin-bottom: 0.7em;
`
;

export const ExitBtn = styled.div`


`
;

export const BtnDiv = styled.div`
    width: 280px;
    height: 250px;
    margin-top: 4em;

    font-family: 'Abhaya Libre';
    font-weight: 550;
    font-size: 14px;
    line-height: 14px;

    color: #BDBDBD;
`
;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;
