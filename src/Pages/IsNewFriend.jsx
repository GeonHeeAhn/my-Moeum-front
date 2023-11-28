import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  PictureContainer,
  Face,
  FaceBox,
  BottomContainer,
  Btn,
} from '../Components/ClassifiContainer';

const IsNewFriend = () => {
  const location = useLocation();

  const croppedFaceDataURL = location.state.img;
  const imgURL = location.state.wholeImg;

  const navigate = useNavigate();

  const moveAdd = async () => {
    navigate('/addname', {
      state: {
        faceImg: croppedFaceDataURL,
        wholeImg: imgURL,
        canvasData: location.state.canvasData,
        faceData: location.state.faceData,
        faceIndex: location.state.faceIndex,
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  const moveToSelect = () => {
    navigate('/selectfriend', {
      state: {
        faceImg: croppedFaceDataURL,
        wholeImg: imgURL,
        canvasData: location.state.canvasData,
        faceData: location.state.faceData,
        faceIndex: location.state.faceIndex,
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>(새로운 친구)님이 맞나요?</Question>
        <PictureContainer>
          <Face>
            <img
              src={croppedFaceDataURL}
              style={{
                width: '90%',
                transform: 'scale(2)',
                objectFit: 'cover',
              }}
            />
          </Face>
        </PictureContainer>
        <BottomContainer>
          <Btn onClick={moveAdd}>네, 맞아요!</Btn>
          <Btn onClick={moveToSelect}>등록된 친구예요.</Btn>
        </BottomContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default IsNewFriend;
