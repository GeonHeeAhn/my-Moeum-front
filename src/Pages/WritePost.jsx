import styled from 'styled-components';
import React, { useEffect, useState, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

//components
import { NavBar, NavBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import Main from '../Components/Main';
import {
  SmallerTitle,
  TxtBox,
  TextArea,
  FContainer,
  Friend,
  FriendPic,
  Name,
} from '../Components/postingComponents';

import { TopBar, Title } from '../Components/TopBar';

//assets
import BackIcon from '../Assets/icons/goback.png';
import { formatWithCursor } from 'prettier';

/*function dataURItoBlob(dataURI) {
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
}*/

function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var blob = xhr.response;
      resolve(blob);
    };

    xhr.onerror = function () {
      reject(new Error('Network error while fetching the URL'));
    };

    xhr.send();
  });
}
function dataURLtoBlob(dataURL) {
  // "data:image/jpeg;base64," 부분을 제거하고 base64 데이터만 가져오기
  const base64Data = dataURL.split(',')[1];

  // base64 데이터를 ArrayBuffer로 디코딩
  const binaryString = window.atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // ArrayBuffer를 사용하여 Blob 생성
  const blob = new Blob([bytes], { type: 'image/jpeg' });
  return blob;
}

const ArraytoString = (friendData) => {
  return friendData.map((friend) => friend.name).join(',');
};

export const WritePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [originalImgBlob, setOriginalImgBlob] = useState(null);
  const faces = [];

  const imgURL = location.state.wholeImg;
  const savedFriendData = location.state.savedFriendData;
  const newFriendData = location.state.newFriendData;

  //새로운 친구들의 얼굴 사진만을 담은 faces 배열
  newFriendData.forEach((friend) => {
    const blob = dataURLtoBlob(friend.faceImg);
    faces.push(blob);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // urlToBlob 함수를 비동기로 호출하여 Blob 객체를 얻음
        const Blob = await urlToBlob(imgURL);
        setOriginalImgBlob(Blob);
        newFriendData.forEach((friend) => {
          const blob = urlToBlob(friend.faceImg);
          faces.push(blob);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  const oldFriendNames = ArraytoString(savedFriendData);
  const newFriendNames = ArraytoString(newFriendData);

  const formData = new FormData();
  formData.append('originalImg', originalImgBlob);
  formData.append('faces', faces);
  formData.append('newFriendNames', newFriendNames);
  formData.append('oldFriendNames', oldFriendNames);

  //const entries = formData.values();
  //let entry = entries.next();
  //console.log(entry);

  //날짜
  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#333333',
        cursor: 'pointer',
        padding: '5px 15px',
        border: 'none',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '15px',
        height: '21px',
        textAlign: 'center',
        width: '100%',
        textDecoration: 'underline',
        textDecorationColor: '#bdbdbd',
      }}
    >
      {value}
    </button>
  ));

  //위치
  const [keyword, setKeyword] = useState('');
  const [coordinates, setCoordinates] = useState(0, 0);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키가 눌렸을 때 검색 실행
      searchLocation();
    }
  };

  const searchLocation = async () => {
    const inputValue = keyword.trim();

    // 입력값이 비어있으면 빈 좌표값으로 설정
    if (!inputValue) {
      setCoordinates(null);
      return;
    }
    try {
      // Kakao API를 사용하여 장소 검색
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword`,
        {
          headers: {
            Authorization: `KakaoAK 2adcff2adbb8ed5a2231575d1e2bc715`,
          },
          params: {
            query: inputValue,
          },
        },
      );
      // 검색 결과에서 첫 번째 장소의 좌표를 가져옴
      if (response.data.documents.length > 0) {
        const firstPlace = response.data.documents[0];
        setCoordinates({
          x: firstPlace.x,
          y: firstPlace.y,
        });
      } else {
        // 검색 결과가 없을 경우 좌표값을 null로 설정
        setCoordinates(null);
      }
    } catch (error) {
      console.error('장소 검색 중 오류 발생:', error);
    }
  };

  /*
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672`;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        // 페이지가 로드된 후에 실행될 코드
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(coordinates.x, coordinates.y),
          level: 3,
        };

        // 카카오맵 생성
        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성 및 추가
        const markerPosition = new window.kakao.maps.LatLng(
          coordinates.x,
          coordinates.y,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  }, [keyword]); */

  const [text, setText] = useState('');

  return (
    <BackgroundContainer>
      <TopBar>
        <NavBtn>
          <img
            src={BackIcon}
            alt="뒤로가기"
            style={{ paddingTop: '90px', marginLeft: '-110px' }}
          />
        </NavBtn>
        <Title>네컷 등록</Title>
      </TopBar>
      <MiniContainer>
        <img
          src={imgURL}
          style={{
            position: 'relative',
            width: 250,
            paddingTop: '300px',
            borderRadius: '10px',
          }}
          alt="선택한 이미지"
        />
        <SmallerTitle>When</SmallerTitle>
        <DatePicker
          shouldCloseOnSelect
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<ExampleCustomInput />} // border 제거
        />
        <SmallerTitle>Where</SmallerTitle>
        <TxtBox
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="장소를 검색하세요"
        ></TxtBox>
        {coordinates ? (
          <div
            style={{
              fontSize: '12px',
            }}
          >
            장소 삽입 완료!
          </div>
        ) : (
          <div
            style={{
              fontSize: '10px',
            }}
          >
            키워드를 조금 자세히 적어주세요 ex. 이대x 이화여대o
          </div>
        )}
        <SmallerTitle>Whom</SmallerTitle>
        <FContainer>
          {savedFriendData.map((friend, index) => (
            <Friend key={index}>
              <FriendPic>
                <img
                  src={friend.faceImg}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '100%',
                  }}
                />
              </FriendPic>
              <Name>{friend.name}</Name>
            </Friend>
          ))}
          {newFriendData.map((friend, index) => (
            <Friend key={index}>
              <FriendPic>
                <img
                  src={friend.faceImg}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '100%',
                  }}
                />
              </FriendPic>
              <Name>{friend.name}</Name>
            </Friend>
          ))}
        </FContainer>
        <SmallerTitle>What</SmallerTitle>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="내용을 입력해주세요"
        />
      </MiniContainer>
      <PaddingContainer />
      <NavBar
        content={text}
        takenAt={startDate.toLocaleDateString()}
        location={keyword}
        latitude={coordinates.y}
        longitude={coordinates.x}
        formData={formData}
        original={originalImgBlob}
        faces={faces}
        newFriendNames={newFriendNames}
        oldFriendNames={oldFriendNames}
      />
    </BackgroundContainer>
  );
};

export default WritePost;

export const MiniContainer = styled(Main)`
  width: 80%;
  display: flex;
  height: calc(100vh-140px);
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  padding-top: 30px;
`;

export const PaddingContainer = styled.div`
  width: 100%;
  height: 200px;
`;
