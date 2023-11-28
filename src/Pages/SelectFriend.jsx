import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  Upper,
  Num,
  Down,
  BtnContainer,
  Friend,
  FriendPic,
  Name,
  Container,
} from '../Components/NumofPeople';

import demo from '../../public/dummy/dummy.json';

const SelectFriend = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [friendlist, setFriendlist] = useState();
  const [fd, setfd] = useState([]);

  const friendsList = demo.userList.map((user) => user.friendsList).flat();

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = decodeURIComponent(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const croppedFaceDataURL = location.state.faceImg;
  const originalImg = location.state.wholeImg;
  const imgURL = location.state.wholeImg;
  const orginalImgBlob = dataURItoBlob(imgURL);

  /*savedFriendData.forEach((friend, index) => {
    formData.append(`savedFriend_${index + 1}_name`, friend.name);
  });*/

  //임시로 넣어둔 데이터 - 이후 선택된 인물의 값을 적용할 수 있도록 코드 변경해두어야함
  const moveFunc = (friendName) => {
    navigate('/isanyonemore', {
      state: {
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        faceData: location.state.faceData,
        faceIndex: location.state.faceIndex,
        savedFriendData: [
          ...location.state.savedFriendData,
          {
            name: friendName,
            //친구목록 파일의 사진으로 추후 수정
            faceImg: croppedFaceDataURL,
          },
        ],
        newFriendData: location.state.newFriendData,
      },
    });
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
        <Upper>
          <Num>사진 속 친구</Num>를 선택해주세요.
        </Upper>
        <Container>
          {fd.map((friend, index) => (
            <Friend onClick={() => moveFunc(friend.friendName)} key={friend.id}>
              <FriendPic>
                <img
                  src={friend.imgPath}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '100%',
                  }}
                />
              </FriendPic>
              <Name>{friend.friendName}</Name>
            </Friend>
          ))}
        </Container>
        <BtnContainer></BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default SelectFriend;
