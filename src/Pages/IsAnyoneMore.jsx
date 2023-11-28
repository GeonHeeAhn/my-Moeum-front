import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  Upper,
  Num,
  Down,
  PictureContainer,
  BtnContainer,
} from '../Components/NumofPeople';
import {
  ModalBack,
  ModalBox,
  ModalContent,
  Alert,
} from '../Components/PopupModal';
import { Btn } from '../Components/ClassifiContainer';

const filterByXValue = (faceInfos, x, y) => {
  return faceInfos.filter(
    (item) =>
      x >= item.detection._box._x &&
      x <= item.detection._box._x + item.detection._box._width &&
      y >= item.detection._box._y &&
      y <= item.detection._box._y + item.detection._box._height,
  );
};

const IsAnyoneMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const FaceContainer = useRef(null);
  const pictureContainerRef = useRef(null);
  const modalBackground = useRef();

  const [isAdded, setIsAdded] = useState(false);

  const imgURL = location.state.wholeImg;
  const canvasData = location.state.canvasData;
  const faceData = location.state.faceData;
  const faceIndex = location.state.faceIndex;

  const faceInfos = faceData.map((item) => ({
    detection: item.detection,
    label: item.label,
  }));

  const handleCanvasClick = (event) => {
    if (pictureContainerRef.current) {
      const rect = FaceContainer.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const filteredFace = filterByXValue(faceInfos, x, y);
      if (faceIndex.includes(faceInfos.indexOf(filteredFace[0]))) {
        setIsAdded(true);
        //다시 클릭
      } else {
        faceIndex.push(faceInfos.indexOf(filteredFace[0]));
        console.log(faceIndex);
        console.log(faceInfos);
        const canvas = document.createElement('canvas');
        const faceContext = canvas.getContext('2d');

        const img = new Image();
        img.src = imgURL;

        img.onload = function () {
          // 기준이 되는 displaySize
          const displaySize = {
            width: 350,
            height: 350 / (img.width / img.height),
          };

          // 이미지의 크기에 비례하여 x, y, width, height 값을 조정
          const { _x, _y, _width, _height } = filteredFace[0].detection._box;
          const adjustedX = (_x / displaySize.width) * img.width;
          const adjustedY = (_y / displaySize.height) * img.height;
          const adjustedWidth = (_width / displaySize.width) * img.width;
          const adjustedHeight = (_height / displaySize.height) * img.height;
          canvas.width = adjustedWidth;
          canvas.height = adjustedHeight;

          faceContext.drawImage(
            img,
            adjustedX,
            adjustedY,
            adjustedWidth,
            adjustedHeight,
            0,
            0,
            adjustedWidth,
            adjustedHeight,
          );

          const croppedFace = canvas.toDataURL('image/png');

          if (filteredFace[0].label.split(' ')[0] === 'unknown') {
            navigate('/isnewfriend', {
              state: {
                img: croppedFace,
                wholeImg: imgURL,
                canvasData: canvasData,
                faceData: faceData,
                faceIndex: faceIndex,
                savedFriendData: location.state.savedFriendData,
                newFriendData: location.state.newFriendData,
              },
            });
          } else {
            navigate('/issavedfriend', {
              state: {
                img: croppedFace,
                name: filteredFace[0].label.split(' ')[0],
                wholeImg: imgURL,
                canvasData: canvasData,
                faceData: faceData,
                faceIndex: faceIndex,
                savedFriendData: location.state.savedFriendData,
                newFriendData: location.state.newFriendData,
              },
            });
          }
        };
      }
    }
  };

  const moveFunc = () => {
    //게시글 작성화면에는 인생네컷 사진, 새로운친구목록과 각각의 사진, 저장된친구목록의 이름만을 필요로 함
    //하지만 게시글 속 친구목록 출력 위하여 저장된 친구목록의 사진 역시 필요
    navigate('/posting', {
      state: {
        wholeImg: imgURL,
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>
          <Upper>
            <Num>추가로 등록하실 친구</Num>가 있나요?
          </Upper>
          <Down>추가하고 싶은 친구를 눌러주세요</Down>
        </Question>
        <PictureContainer style={{ height: 525 }} ref={pictureContainerRef}>
          <img
            src={imgURL}
            style={{ position: 'absolute', width: 350, objectFit: 'cover' }}
            alt="선택한 이미지"
          />
          <img
            src={canvasData}
            style={{ position: 'absolute', width: 350, objectFit: 'cover' }}
            alt="Canvas Image"
            ref={FaceContainer}
            onClick={handleCanvasClick}
          />
        </PictureContainer>
        <BtnContainer>
          <Btn onClick={moveFunc}>모두 등록했어요~</Btn>
        </BtnContainer>
        {isAdded && (
          <ModalBack
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setIsAdded(false);
              }
            }}
          >
            <ModalBox>
              <ModalContent>
                <Alert>이미 선택한 친구입니다</Alert>
              </ModalContent>
            </ModalBox>
          </ModalBack>
        )}
      </Content>
    </BackgroundContainer>
  );
};

export default IsAnyoneMore;

const DemoBtn = styled.button`
  width: 350px;
  position: absolute;
  height: 250px;
  border: none;
  background: transparent;
`;
