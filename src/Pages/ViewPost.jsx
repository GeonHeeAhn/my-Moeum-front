import React, { useState, useEffect, useRef } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';

//components
import { NavBar } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import { TopBar, Title, Back } from '../Components/TopBar';
import {
  Content,
  ContentContainer,
  MiniContainer,
  ImgContainer,
  SecondaryTitle,
  ShareBtn,
  Text,
  Date,
  Delete,
} from '../Components/viewingComponents';
import {
  ModalBack,
  ModalBox,
  YesButton,
  NoButton,
  ModalContent,
  Alert,
  BtnDiv,
} from '../Components/PopupModal';
import {
  CommentSection,
  Comments,
  Comment,
  CommentInputContainer,
  CommentInput,
  CommentButton,
  ProfilePicture,
  Nickname,
  CommentContent,
  CommentDate,
  CommentContents,
} from '../Components/Comment';
import Loading from './Loading';

//assets
import insta from '../Assets/icons/Insta.png';
import axios from 'axios';

export const ViewPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const modalBackground = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const { postId } = useParams();
  const [postData, setPostData] = useState('');
  const postRef = useRef({ current: '' });
  let pd;
  const nicknames = [
    '수줍은 토끼',
    '감기걸린 토끼',
    '졸린 토끼',
    '할로윈 토끼',
    '왹져 토끼',
    '수줍은 거북이',
    '감기걸린 거북이',
    '졸린 거북이',
    '할로윈 거북이',
    '왹져 거북이',
    '수줍은 강아지',
    '감기걸린 강아지',
    '졸린 강아지',
    '할로윈 강아지',
    '왹져 강아지',
    '수줍은 고양이',
    '감기걸린 고양이',
    '졸린 고양이',
    '할로윈 고양이',
    '왹져 고양이',
    '수줍은 판다',
    '감기걸린 판다',
    '졸린 판다',
    '할로윈 판다',
    '왹져 판다',
  ];
  const profilePictures = [
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/0.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/1.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/2.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/3.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/4.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/5.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/6.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/7.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/8.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/9.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/10.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/11.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/12.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/13.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/14.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/15.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/16.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/17.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/18.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/19.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/20.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/21.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/22.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/23.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/24.png?raw=true',
  ];

  const sendApi = async () => {
    try {
      // Send API request
      const response = await axios({
        method: 'GET',
        url: `/post/${postId}`,
        withCredentials: true,
      });
      postRef.current = response.data.post;
      console.log('sendApi = ' + response.status);
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
    }
  };

  const imgApi = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/images/${postRef.current.imgPath}`,
        withCredentials: true,
        responseType: 'blob',
      });

      console.log('imgApi = ' + response.status);
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      postRef.current = { ...postRef.current, imgPath: blobUrl };
    } catch (error) {
      // 오류 처리
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await sendApi();
      await imgApi();
    };

    fetchData();
  }, []);

  const copyUrl = () => {
    const nowUrl = window.location.href;
    // "viewpost"를 "share"로 변경
    const modifiedUrl = nowUrl.replace('/viewpost/', '/share/');

    // 수정된 URL을 클립보드에 복사
    navigator.clipboard.writeText(modifiedUrl).then((res) => {
      alert('주소가 복사되었습니다!');
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const deletePost = async () => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `/post/${postId}?userId=1`,
        withCredentials: true,
      });

      if (response.data.success) {
        console.log('포스트 삭제 성공');
        navigate('/home');
      } else {
        console.log('포스트 삭제 실패');
      }
    } catch (error) {
      console.error('포스트 삭제 중 오류 발생', error);
    }
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back />
          <Title>네컷 일기</Title>
        </TopBar>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ContentContainer>
              <MiniContainer>
                <ImgContainer>
                  <img src={postRef.current.imgPath} width="100%" />
                </ImgContainer>
                <SecondaryTitle>
                  {postRef.current.friends
                    .map((friend) => (friend ? `${friend.friendName}` : ''))
                    .join(', ')}
                  {'('}이{')'}랑 {postRef.current.location}에서
                </SecondaryTitle>
                <ShareBtn>
                  <img src={insta} alt="로고" onClick={copyUrl} />
                </ShareBtn>
                <Text>{postRef.current.content}</Text>
                <Date>{postRef.current.takenAt}</Date>
              </MiniContainer>

              <Delete onClick={openModal}>삭제하기</Delete>
            </ContentContainer>
            <CommentSection>
              <Comments>
                {' '}
                {postRef.current.comments.map((comment) => (
                  <Comment key={comment.id}>
                    <ProfilePicture alt="프로필 사진">
                      <img src={profilePictures[comment.id]} width="30px" />
                    </ProfilePicture>
                    <CommentContents>
                      <Nickname>{nicknames[comment.id]}</Nickname>
                      <CommentContent>{comment.content}</CommentContent>
                    </CommentContents>
                  </Comment>
                ))}
              </Comments>
            </CommentSection>
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
                    <Alert>정말로 삭제하시겠습니까?</Alert>
                    <BtnDiv>
                      <YesButton onClick={deletePost}>네</YesButton>
                      <NoButton>아니오</NoButton>
                    </BtnDiv>
                  </ModalContent>
                </ModalBox>
              </ModalBack>
            )}
          </>
        )}
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default ViewPost;
