import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import balloon from '../Assets/balloon.png';
import Logo from '../Assets/logo.png';
import {
  TopBar,
  Title,
  Alert,
  Balloon,
  Text,
  LogoC,
  Content,
  Gallery,
  Photo,
  Left,
  Right,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import demo from '../../public/dummy/dummy.json';
import axios, { AxiosError } from 'axios';
import Loading from './Loading';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [postlist, setPostlist] = useState();
  const [pd, setpd] = useState('');
  const [name, setName] = useState('');

  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (loading) return;

    setLoading(true);

    try {
      // Send API request
      const response = await axios({
        method: 'GET',
        url: `/posts?userId=${1}`,
        withCredentials: true,
      });
      setPostlist(response.data.posts);
      // 2XX status code
      console.log(response.status);
      console.log(response.data);
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
      setLoading(false);
    }
  };

  const imgApi = async () => {
    console.log('api 들어옴ㅁ');
    try {
      console.log('try문 들어옴');
      const newPostlist = await Promise.all(
        postlist.map(async (post) => {
          const response = await axios({
            method: 'GET',
            url: `/images/${post.imgPath}`,
            withCredentials: true,
            responseType: 'blob',
          });

          // 2XX status code
          console.log(response.status);

          // 이미지를 Blob에서 URL로 변환
          const blobUrl = URL.createObjectURL(new Blob([response.data]));

          // 새로운 객체를 생성하여 기존 post의 정보를 복사하고 imgPath를 업데이트
          return { ...post, imgPath: blobUrl };
        }),
      );

      setpd(newPostlist);
      console.log('일단 map은 끝남');
    } catch (error) {
      // 오류 처리
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const latestPostApi = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/latest?userId=${1}`,
        withCredentials: true,
      });

      console.log(response.status);
      setName(response.data.post.friends[0].friendName);
      console.log(response.data.post.friends[0].friendName);
    } catch (error) {
      // 오류 처리
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await sendApi();
      await imgApi();
      await latestPostApi();
    };

    fetchData();
  }, []);

  useEffect(() => {
    imgApi();
  }, [postlist]);

  if (location.state) {
    useEffect(() => {
      console.log(location.state);
    }, []);

    console.log(location.state.date);
  }
  const postOnClick = (index) => {
    navigate(`/viewpost/${index}`);
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title style={{ marginLeft: '10px' }}>Moeum</Title>
          <Alert>
            <Balloon>
              <img src={balloon} alt="말풍선" />
            </Balloon>
            <Text>{name}님과 네컷을 찍은 지 21일 째에요!</Text>
            <LogoC>
              <img src={Logo} alt="로고" width="50px" height="50px" />
            </LogoC>
          </Alert>
        </TopBar>
        <Gallery>
          {!loading && pd !== '' ? (
            pd.reverse().map((post) => (
              <Photo onClick={() => postOnClick(post.id)} key={post.id}>
                <img
                  src={post.imgPath}
                  width="160px"
                  style={{ borderRadius: '15px' }}
                  // onClick={movePost}
                />
              </Photo>
            ))
          ) : (
            <Loading />
          )}
        </Gallery>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default HomeScreen;
