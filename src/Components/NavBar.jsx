import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';

import home from '../Assets/icons/home.png';
import map from '../Assets/icons/map.png';
import friends from '../Assets/icons/friends.png';
import settings from '../Assets/icons/settings.png';
import plus from '../Assets/icons/plus.png';
import check from '../Assets/icons/check.png';
import homeOn from '../Assets/icons/homeOn.png';
import mapOn from '../Assets/icons/mapOn.png';
import friendsOn from '../Assets/icons/friendsOn.png';
import settingsOn from '../Assets/icons/settingsOn.png';

import { ModalBack, ModalBox, ModalBtn, ExitBtn } from './PhotoModal';

export const NavBar = (props) => {
  const modalBackground = useRef();
  const fileInput = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [modalOpen, setModalOpen] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const isPostingPage = currentPath === '/posting';
  const isHome = currentPath === '/home';
  const isBinder = currentPath === '/binder';
  const isMap = currentPath === '/map';
  const isSettings = currentPath === '/settings';

  const writePost = async (props) => {
    const formData = new FormData();
    const content = props.content;
    const takenAt = props.takenAt;
    const postingLocation = props.location;
    const latitude = props.latitude;
    const longitude = props.longitude;
    //const formData = props.formData;
    const original = props.original;
    const faces = props.faces;
    const newFriendNames = props.newFriendNames;
    const oldFriendNames = props.oldFriendNames;

    const facesArray = [new Blob(), new Blob() /* ... */]; // Blob 객체로 이루어진 배열

    // facesArray 배열의 각 Blob을 FormData에 추가
    faces.forEach((blob) => {
      formData.append('faces', blob);
    });

    formData.append('content', content);
    formData.append('takenAt', '2023-11-17');
    formData.append('location', postingLocation);
    formData.append('latitude', parseFloat(latitude).toFixed(6));
    formData.append('longitude', parseFloat(longitude).toFixed(6));
    formData.append('original', original);
    formData.append('faces', faces);
    formData.append('newFriendNames', newFriendNames);
    formData.append('oldFriendNames', oldFriendNames);
    //console.log(faces);
    const entriesArray = [...formData.entries()];
    console.log(entriesArray);
    console.log(postingLocation);
    console.log(longitude);
    console.log(typeof latitude);

    if (isApiLoading) return;

    setIsApiLoading(true);

    try {
      const response = await axios.request({
        method: 'post',
        url: `/posts?userId=${1}`,
        data: formData,

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //viewpost로 가는 함수 작성하기

      console.log(response);
      console.log(response.status);
      console.log(response.data);
      console.log(response.headers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsApiLoading(false);
      navigate('/home');
    }
  };

  const moveHome = () => {
    navigate('/home');
  };

  const moveBinder = () => {
    navigate('/binder');
  };

  const moveMypage = () => {
    navigate('/settings');
  };

  const moveMap = () => {
    navigate('/map');
  };

  /*const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result);
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };*/

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      navigate('/facerecognition', { state: { img: selectedFile } });
      /*onImageSelect(selectedFile);*/
    }
  };

  const fileUpload = () => {
    // input 요소 클릭
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <>
      <>
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
              <ModalBtnTop>카메라</ModalBtnTop>
              <ModalBtn onClick={fileUpload}>사진 보관함</ModalBtn>
              <input
                type="file"
                ref={fileInput}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="imageUpload"
              />
            </ModalBox>
            <ExitBtn onClick={() => setModalOpen(false)}>취소</ExitBtn>
          </ModalBack>
        )}
      </>
      <NavigationBar>
        <NavBtn>
          {isHome ? (
            <img src={homeOn} onClick={moveHome} alt="홈" />
          ) : (
            <img src={home} onClick={moveHome} alt="홈" />
          )}
        </NavBtn>
        <NavBtn>
          {isBinder ? (
            <img src={friendsOn} onClick={moveBinder} alt="친구" />
          ) : (
            <img src={friends} onClick={moveBinder} alt="친구" />
          )}
        </NavBtn>
        {isPostingPage ? (
          <CenterBtn onClick={() => writePost(props)}>
            <img src={check} alt="작성버튼" />
          </CenterBtn>
        ) : (
          <CenterBtn onClick={() => setModalOpen(true)}>
            <img src={plus} alt="추가 버튼" />
          </CenterBtn>
        )}
        <NavBtn />
        <NavBtn>
          {isMap ? (
            <img src={mapOn} onClick={moveMap} alt="지도" />
          ) : (
            <img src={map} alt="로고" onClick={moveMap} />
          )}
        </NavBtn>
        <NavBtn>
          {isSettings ? (
            <img src={settingsOn} onClick={moveMypage} alt="마이페이지" />
          ) : (
            <img src={settings} alt="로고" onClick={moveMypage} />
          )}
        </NavBtn>
      </NavigationBar>
    </>
  );
};

export const NavigationBar = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  height: 94px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.07);
  background: white;
  position: fixed;
  z-index: 1;
  padding: 0 10px;
`;
export const NavBtn = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  display: flex;
  align-items: center;
  border: none;
  padding: 0px;
  position: relative;
  z-index: 1000;
`;

export const CenterBtn = styled.button`
  position: fixed;
  bottom: 60px;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: #ffc329;
  z-index: 2;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
`;

// export const PlusBtn = styled.button`
//   width: 30px;
//   height: 30px;
//   background: transparent;
//   display: flex;
//   align-items: center;
//   align-content: center;
//   border: none;
//   margin: 0px 0px 0px 0px;
//   padding: 0px;
//   position: relative;
//   z-index: 1000;
// `;

export const ModalBtnTop = styled(ModalBtn)`
  //왜인지 모르겠으나 적용이 안댐..
  border-bottom: 1px #dddddd;
`;
