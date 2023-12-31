import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import balloon from '../Assets/balloon.png';
import Logo from '../Assets/logo.png';
import {
  TopBar,
  FriendTitle,
  Alert,
  Balloon,
  Text,
  LogoC,
  Content,
  Gallery,
  Photo,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import { Back2 } from '../Components/TopBar';
import axios, { AxiosError } from 'axios';
import Loading from './Loading';

const FriendPostList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postlist, setPostlist] = useState([]);
  const [friend, setFriend] = useState();
  const [pd, setpd] = useState('');
  const { id, friendName } = useParams();

  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (loading) return;

    setLoading(true);

    try {
      // Send API request
      const response = await axios({
        method: 'GET',
        url: `/friend/${id}`,
        withCredentials: true,
      });
      console.log(response.data);

      setFriend(response.data.friend);
      setPostlist(response.data.friend.posts);
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
  //postlist의 post의 imgPath를 response 값의 img로 바꿔주는 코드를 작성해줘
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

  console.log(pd);

  useEffect(() => {
    const fetchData = async () => {
      await sendApi();
      await imgApi();
    };

    fetchData();
  }, []);

  useEffect(() => {
    imgApi();
  }, [postlist]);

  const postOnClick = (id) => {
    navigate(`/viewpost/${id}`);
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back2 />
          {friend && <FriendTitle>{friend.friendName}</FriendTitle>}
          <Alert>
            <Balloon>
              <img src={balloon} alt="말풍선" />
            </Balloon>
            {friend && (
              <Text>{friend.friendName}님과 네컷을 찍은 지 26일 째에요!</Text>
            )}
            <LogoC>
              <img src={Logo} alt="로고" width="50px" height="50px" />
            </LogoC>
          </Alert>
        </TopBar>
        <Gallery>
          {!loading && pd !== '' ? (
            pd.map((post) => (
              <Photo onClick={() => postOnClick(post.id)} key={post.id}>
                <img
                  src={post.imgPath}
                  width="160px"
                  style={{ borderRadius: '15px' }}
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

export default FriendPostList;
