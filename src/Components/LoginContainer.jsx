import { styled } from 'styled-components';

export const Content = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LogoDiv = styled.div`
  width: 80px;
  height: 120px;
  border-radius: 20px;
`;

export const Title = styled.div`
  width: 132px;
  height: 50px;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 22px;
  line-height: 29px;
  color: #121212;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 252px;
  height: 85px;
`;

export const SemiTitle = styled.div`
  width: 106px;
  height: 36px;

  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;

  color: #333333;
`;

export const Input = styled.input`
  width: 252px;
  height: 37px;

  background: #ffe8a6;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;

  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: -0.1px;
  color: #333333;
`;

export const SignUpContainer = styled.div`
  width: 252px;
  height: 73px;
  display: flex;
  justify-content: flex-end;
`;

export const SignUpLink = styled.button`
  width: 120px;
  height: 36px;

  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  text-decoration-line: underline;
  border: none;

  color: #808080;
  background: none;
`;

export const Lower = styled.div`
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Button = styled.button`
  width: 120px;
  height: 40px;

  background: #dddddd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: none;
  font-family: 'Pretendard';
  font-size: 17px;

  color: #ffffff;
`;

export const styles = {
  filledBtn: {
    backgroundColor: '#FFC329',
  },
  normalBtn: {
    backgroundColor: '#DDDDDD',
  },
};

export const ValidDiv = styled.div`
  font-size: 11px;
  width: 180px;
  height: 36px;
  display: flex;
  align-content: center;
  color: red;
  margin-top: 4px;
  padding-top: 8px;
`;

export const SemiDiv = styled.div`
  display: flex;
`;
