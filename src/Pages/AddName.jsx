import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  PictureContainer,
  Face,
  FaceBox,
  BottomContainer,
  Name,
  NextBtn,
} from '../Components/ClassifiContainer';

const AddName = () => {
  const location = useLocation();

  // 데이터 URL을 받아옴
  const croppedFaceDataURL = location.state.faceImg;
  const imgURL = location.state.wholeImg;

  const [text, setText] = useState('');
  const [btnColor, setBtnColor] = useState(false);

  useEffect(() => {
    if (text !== '') {
      setBtnColor(true);
    } else {
      setBtnColor(false);
    }
  }, [text]);

  const navigate = useNavigate();

  const movePage = () => {
    if (text !== '') {
      navigate('/isanyonemore', {
        state: {
          wholeImg: imgURL,
          canvasData: location.state.canvasData,
          faceData: location.state.faceData,
          faceIndex: location.state.faceIndex,
          savedFriendData: location.state.savedFriendData,
          newFriendData: [
            ...location.state.newFriendData,
            {
              name: text,
              faceImg: croppedFaceDataURL,
            },
          ],
        },
      });
    }
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>
          친구의 이름이
          <br></br>
          무엇인가요
        </Question>
        <PictureContainer>
          <Face>
            <img
              src={croppedFaceDataURL}
              style={{ width: '90%', transform: 'scale(2)' }}
            />
          </Face>
        </PictureContainer>
        <BottomContainer>
          <Name
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="이름 입력"
          ></Name>
          <NextBtn
            style={btnColor ? styles.filledBtn : styles.normalBtn}
            onClick={movePage}
          >
            다음
          </NextBtn>
        </BottomContainer>
      </Content>
    </BackgroundContainer>
  );
};

const styles = {
  filledBtn: {
    backgroundColor: '#FFC329',
  },
  normalBtn: {
    backgroundColor: '#DDDDDD',
  },
};

export default AddName;
