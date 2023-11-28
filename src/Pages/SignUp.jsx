import { useEffect, useState, useRef, React } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import BackgroundContainer from '../Components/BackgroundContainer';
import { Title } from '../Components/SignUpComponents';
import {
  Content,
  Upper,
  Center,
  Container,
  SemiTitle,
  Input,
  Lower,
  Button,
  ValidDiv,
  SemiDiv,
} from '../Components/LoginContainer';
import {
  ModalBack,
  ModalBox,
  ModalButton,
  ModalContent,
  Alert,
} from '../Components/PopupModal';
import Loading from './Loading';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (isLoading) return;

    setIsLoading(true);

    const body = {
      email: info.email,
      username: info.username,
      password: info.password,
    };

    try {
      // Send API request
      const response = await axios({
        method: 'POST',
        url: '/account',
        data: body,
        withCredentials: true,
      });

      const accessToken = response.headers['moeumaccesstoken'];
      const refreshToken = response.headers['moeumrefreshtoken'];

      document.cookie = `accesstoken=${accessToken}; path=/; SameSite=Strict; max-age=3600;`;
      document.cookie = `refreshtoken=${refreshToken}; path=/; SameSite=Strict; max-age=3600;`;

      if (response.status === 200 || response.status === 201) {
        setModalOpen(true);
      }
      // 2XX status code
      console.log(response.status);
      console.log(response.data);
      // 쿠키 확인
      const cookies = response.headers['set-cookie'];
      if (cookies) {
        console.log('Received Cookies:', cookies);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Non-2XX status code
          console.error(error.response.status);
          console.error(error.response.data);
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

  //모달
  const modalBackground = useRef();
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/home');
  };
  const moveLogin = () => {
    navigate('/login');
  };

  const [modalOpen, setModalOpen] = useState(false);

  const [isButtonActive, setIsButtonActive] = useState(false);

  const [info, setInfo] = useState({
    username: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  function useValid(changeValue) {
    const [validText, setValidText] = useState('');
    const [isValid, setIsValid] = useState({
      isUsername: false,
      isEmail: false,
      isPassword: false,
      isConfirmPassword: false,
    });

    useEffect(() => {
      const exp = /^.{1,8}$/;
      if (!exp.test(changeValue.username)) {
        setValidText((prevText) => ({
          ...prevText,
          isUsername: '닉네임은 최대 8자 입니다.',
        }));
        setIsValid({ ...isValid, isUsername: false });
      } else {
        setValidText('');
        setIsValid({ ...isValid, isUsername: true });
      }
    }, [changeValue.username]);

    useEffect(() => {
      const exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      if (!exp.test(changeValue.email)) {
        setValidText((prevText) => ({
          ...prevText,
          isEmail: '이메일을 확인해주세요',
        }));
        setIsValid({ ...isValid, isEmail: false });
      } else {
        setValidText('');
        setIsValid({ ...isValid, isEmail: true });
      }
    }, [changeValue.email]);

    useEffect(() => {
      const exp = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,}$/;
      if (!exp.test(changeValue.password)) {
        setValidText((prevText) => ({
          ...prevText,
          isPassword: '8자 이상의 영어와 숫자여야해요',
        }));
        setIsValid({ ...isValid, isPassword: false });
      } else {
        setValidText('');
        setIsValid({ ...isValid, isPassword: true });
      }
    }, [changeValue.password]);

    useEffect(() => {
      if (!changeValue.ConfirmPassword) {
        setValidText('');
        setIsValid((prevValid) => ({
          ...prevValid,
          isConfirmPassword: false,
        }));
      } else if (changeValue.password === changeValue.ConfirmPassword) {
        setValidText('');
        setIsValid((prevValid) => ({
          ...prevValid,
          isConfirmPassword: true,
        }));
      } else {
        setValidText((prevText) => ({
          ...prevText,
          isConfirmPassword: '비밀번호가 같지 않아요',
        }));
        setIsValid((prevValid) => ({
          ...prevValid,
          isConfirmPassword: false,
        }));
      }
    }, [changeValue.ConfirmPassword]);

    return { validText, isValid };
  }

  const { validText, isValid } = useValid(info);

  useEffect(() => {
    // 회원가입 조건을 검사하여 버튼 활성화 여부를 설정합니다.
    const isInfoValid = validateInputs();
    setIsButtonActive(isInfoValid);
  }, [info, isValid]);

  const validateInputs = () => {
    if (
      isValid.isUsername &&
      isValid.isEmail &&
      isValid.isPassword &&
      isValid.isConfirmPassword
    ) {
      return true; // 조건을 모두 만족하면 true를 반환
    }
    return false; // 조건을 만족하지 않으면 false를 반환
  };

  const buttonStyle = isButtonActive
    ? { backgroundColor: '#FFC329', color: 'black' }
    : { backgroundColor: '#DDDDDD', color: 'white' };

  return (
    <BackgroundContainer>
      <Content>
        <Upper>
          <Title>회원가입</Title>
        </Upper>
        <form onSubmit={handleSubmit}>
          <Center>
            <Container>
              <SemiDiv>
                <SemiTitle>닉네임</SemiTitle>
                <ValidDiv>{validText.isUsername}</ValidDiv>
              </SemiDiv>
              <Input
                type="text"
                value={info.username}
                onChange={(e) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    username: e.target.value,
                  }))
                }
                valid={!isValid.isUsername}
              />
            </Container>
            <Container>
              <SemiDiv>
                <SemiTitle>이메일</SemiTitle>
                <ValidDiv>{validText.isEmail}</ValidDiv>
              </SemiDiv>
              <Input
                type="email"
                value={info.email}
                onChange={(e) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    email: e.target.value,
                  }))
                }
                valid={!isValid.isEmail}
              />
            </Container>
            <Container>
              <SemiDiv>
                <SemiTitle>비밀번호</SemiTitle>
                <ValidDiv>{validText.isPassword}</ValidDiv>
              </SemiDiv>
              <Input
                type="password"
                value={info.password}
                onChange={(e) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    password: e.target.value,
                  }))
                }
                valid={!isValid.isPassword}
              />
            </Container>
            <Container>
              <SemiDiv>
                <SemiTitle>비밀번호 확인</SemiTitle>
                <ValidDiv>{validText.isConfirmPassword}</ValidDiv>
              </SemiDiv>
              <Input
                type="password"
                value={info.ConfirmPassword}
                onChange={(e) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    ConfirmPassword: e.target.value,
                  }))
                }
              />
            </Container>
          </Center>
          <Lower>
            <Button
              type="submit"
              style={{ margin: '25px', ...buttonStyle }}
              disabled={!isButtonActive || isLoading}
            >
              {isLoading && <Loading />}
              가입하기
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
              <Alert>회원가입이</Alert>
              <Alert>완료되었습니다!</Alert>
              <ModalButton onClick={moveLogin}>로그인</ModalButton>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
    </BackgroundContainer>
  );
};

export default SignUp;
