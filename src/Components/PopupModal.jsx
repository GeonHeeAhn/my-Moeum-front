import styled from 'styled-components';

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
    width: 300px;
    height: 160px;

    display: flex;
    align-items: center;
    text-align: center;

    background-color: white;
    border-radius: 30px;
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.1));
`;


export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const Alert = styled.div`
    width: 299.96px;
    height: 25px;

    font-family: 'Arial';
    font-weight: 600;
    font-size: 17px;
    color: #121212;
`;

export const ModalButton = styled.button`
    width: 75px;
    height: 36px;
    background: #FFC329;
    border-radius: 8px;
    border: none;
    margin-top:15px;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    
    font-family: 'Arial';
    font-weight: 600;
    font-size: 16px;
    color: #333333;
`;
export const YesButton = styled.button`
    width: 75px;
    height: 36px;
    border-radius: 8px;
    border: none;
    margin-top:15px;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    
    font-family: 'Arial';
    font-weight: 600;
    font-size: 16px;
    color: #333333;
`;
export const NoButton = styled.button`
    width: 75px;
    height: 36px;
    background: #FFC329;
    border-radius: 8px;
    border: none;
    margin-top:15px;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    
    font-family: 'Arial';
    font-weight: 600;
    font-size: 16px;
    color: #333333;
`;

export const BtnDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 250px;
`;

export const BtnContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 250px;
`;
