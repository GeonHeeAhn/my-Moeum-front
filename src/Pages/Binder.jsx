import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import {
  TopBar,
  Title,
  Content,
  Gallery,
  Left,
  Right,
  Album,
  Bind,
  Spine,
  Cover,
  Name,
  Pic,
} from '../Components/BinderComponent';
import { NavBar } from '../Components/NavBar';
import axios, { AxiosError } from 'axios';
import Loading from './Loading';

const Binder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [friendlist, setFriendlist] = useState();
  const [fd, setfd] = useState([]);

  const colorChart = [
    { spine: '#F5AEAE', cover: '#FCE5DF' },
    { spine: '#FFC19E', cover: '#FFEADA' },
    { spine: '#FFDF70', cover: '#FFF3CC' },
    { spine: '#AFE397', cover: '#E7F5D8' },
    { spine: '#B9E6FF', cover: '#EAF5F7' },
    { spine: '#D3BCF9', cover: '#F2E9F5' },
  ];

  const albumOnClick = (id) => {
    navigate(`/friendpostlist/${id}`);
  };

  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (loading) return;

    setLoading(true);

    try {
      // Send API request
      const response = await axios({
        method: 'GET',
        url: `/friends?userId=1`,
        withCredentials: true,
      });

      setFriendlist(response.data.friends);

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
    }
  };

  const imgApi = async () => {
    console.log('api 들어옴');
    try {
      // Assuming postlist is an array
      console.log('try문 들어옴');
      const newFriendlist = await Promise.all(
        friendlist.map(async (friend) => {
          const response = await axios({
            method: 'GET',
            url: `/images/${friend.imgPath}`,
            withCredentials: true,
            responseType: 'blob',
          });

          // 2XX status code
          console.log(response.status);

          // 이미지를 Blob에서 URL로 변환
          const blobUrl = URL.createObjectURL(new Blob([response.data]));

          // 새로운 객체를 생성하여 기존 post의 정보를 복사하고 imgPath를 업데이트
          return { ...friend, imgPath: blobUrl };
        }),
      );

      setfd(newFriendlist);
      console.log('일단 map은 끝남');
    } catch (error) {
      // 오류 처리
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFriend = async () => {
      await sendApi();
      await imgApi();
    };
    fetchFriend();
  }, []);

  useEffect(() => {
    imgApi();
  }, [friendlist]);

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title>바인더</Title>
        </TopBar>
        <Gallery>
          {fd
            .slice()
            .reverse()
            .map((friend, index) => (
              <Album onClick={() => albumOnClick(friend.id)} key={friend.id}>
                <Bind>
                  <Spine
                    style={{ backgroundColor: colorChart[index % 6].spine }}
                  />
                  <Cover
                    style={{ backgroundColor: colorChart[index % 6].cover }}
                  />
                  <Pic>
                    <img
                      src={friend.imgPath}
                      width="75px"
                      height="85px"
                      style={{ borderRadius: '10px' }}
                    />
                  </Pic>
                </Bind>
                <Name>{friend.friendName}</Name>
              </Album>
            ))}
        </Gallery>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default Binder;
