import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Logo from '../Assets/logo.png';
import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Upper,
  LogoDiv,
  Center,
  Container,
  SemiTitle,
  Input,
  SignUpContainer,
  SignUpLink,
  Lower,
  Button,
  styles,
} from '../Components/LoginContainer';
import Loading from './Loading';
import {
  ModalBack,
  ModalBox,
  ModalButton,
  ModalContent,
  Alert,
} from '../Components/PopupModal';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (isLoading) return;

    setIsLoading(true);

    const body = {
      email: email,
      password: password,
    };

    try {
      // Send API request
      const response = await axios({
        method: 'POST',
        url: '/auth',
        data: body,
        withCredentials: true,
      });

      moveHome();

      const accessToken = response.headers['moeumaccesstoken'];
      const refreshToken = response.headers['moeumrefreshtoken'];

      document.cookie = `accesstoken=${accessToken}; path=/; SameSite=Strict; max-age=3600;`;
      document.cookie = `refreshtoken=${refreshToken}; path=/; SameSite=Strict; max-age=3600;`;

      console.log(response.status);
      console.log(response.data);
    } catch (error) {
      setModalOpen(true);
      if (error instanceof AxiosError) {
        if (error.response) {
          // Non-2XX status code
          console.error(error.response.status);
          console.log('Response data:', error.response.data);
        } else if (error.request) {
          // Request made, no response
          console.error(error.request);
        }
      } else {
        // Other unexpected error
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendApi();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnColor, setBtnColor] = useState(false);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setBtnColor(true);
    } else {
      setBtnColor(false);
    }
  }, [email, password]);

  const navigate = useNavigate();
  const moveSignUp = () => {
    navigate('/signup');
  };
  const moveHome = () => {
    navigate('/home');
  };

  //모달
  const modalBackground = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <BackgroundContainer>
      <Content>
        <form onSubmit={handleSubmit}>
          <Upper>
            <LogoDiv>
              <img src={Logo} alt="로고" width="70px" />
            </LogoDiv>
          </Upper>
          <Center>
            <Container>
              <SemiTitle>이메일</SemiTitle>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </Container>
            <Container>
              <SemiTitle>비밀번호</SemiTitle>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </Container>
            <SignUpContainer>
              <SignUpLink onClick={moveSignUp}>계정이 없으신가요?</SignUpLink>
            </SignUpContainer>
          </Center>
          <Lower>
            <Button
              type="submit"
              disabled={isLoading || !btnColor}
              style={btnColor ? styles.filledBtn : styles.normalBtn}
              onClick={handleSubmit}
            >
              {isLoading && <Loading />}
              로그인
            </Button>
          </Lower>
        </form>
      </Content>
      {modalOpen && (
        <ModalBack
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <ModalBox>
            <ModalContent>
              <Alert>이메일 혹은 비밀번호가</Alert>
              <Alert>맞지 않습니다</Alert>
              <ModalButton onClick={() => closeModal()}>닫기</ModalButton>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
    </BackgroundContainer>
  );
};

export default Login;
