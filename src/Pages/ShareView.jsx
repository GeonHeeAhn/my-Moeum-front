import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
//components
import { NavBar, NavBtn, CenterBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import { Loading } from './Loading';
import Main from '../Components/Main';
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
import demo from '../../public/dummy/dummy.json';

//assets
import arrow from '../Assets/icons/arrow.png';

export const ShareView = () => {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const postRef = useRef({ current: '' });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const commentRef = useRef();

  /*const postIds = demo.userList.map(post => post.id);
  const commentList = demo.userList.flatMap(user => 
    user.postList.filter(post => postIds.includes(post.id))
    .flatMap(post => post.commentList)); */

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
    '../../public/profileImg/0.png',
    '../../public/profileImg/1.png',
    '../../public/profileImg/2.png',
    '../../public/profileImg/3.png',
    '../../public/profileImg/4.png',
    '../../public/profileImg/5.png',
    '../../public/profileImg/6.png',
    '../../public/profileImg/7.png',
    '../../public/profileImg/8.png',
    '../../public/profileImg/9.png',
    '../../public/profileImg/10.png',
    '../../public/profileImg/11.png',
    '../../public/profileImg/12.png',
    '../../public/profileImg/13.png',
    '../../public/profileImg/14.png',
    '../../public/profileImg/15.png',
    '../../public/profileImg/16.png',
    '../../public/profileImg/17.png',
    '../../public/profileImg/18.png',
    '../../public/profileImg/19.png',
    '../../public/profileImg/20.png',
    '../../public/profileImg/21.png',
    '../../public/profileImg/22.png',
    '../../public/profileImg/23.png',
    '../../public/profileImg/24.png',
  ];

  const addComment = async () => {
    if (newComment.trim() !== '') {
      const randomIndex = Math.floor(Math.random() * nicknames.length);
      const randomNickname = nicknames[randomIndex];
      const randomProfilePicture = profilePictures[randomIndex];

      const newCommentObject = {
        content: newComment,
        profilePicture: randomProfilePicture, // 여기에 프로필 사진 URL을 넣어주세요
        nickname: randomNickname, // 여기에 사용자 닉네임을 넣어주세요
        //date: new Date(), // 현재 날짜 및 시간을 문자열로 사용
      };
      const body = {
        profile: randomIndex,
        content: newComment,
      };
      console.log(body);
      setComments([...comments, newCommentObject]);
      setNewComment('');

      try {
        const response = await axios({
          method: 'POST',
          data: body,
          url: `/post/${postId}/comment?userId=1`,
          withCredentials: true,
        });
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
    }
  };

  const sendApi = async () => {
    try {
      // Send API request
      const response = await axios({
        method: 'GET',
        url: `/post/${postId}?userId=${1}`,
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

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
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
                <Text>{postRef.current.content}</Text>
                <Date>{postRef.current.takenAt}</Date>
              </MiniContainer>
            </ContentContainer>
            <CommentSection>
              <Comments>
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
                {comments.map((comment, index) => (
                  <Comment key={index}>
                    <ProfilePicture alt="프로필 사진">
                      <img src={comment.profilePicture} width="30px" />
                    </ProfilePicture>
                    <CommentContents>
                      <Nickname>{comment.nickname}</Nickname>
                      <CommentContent>{comment.content}</CommentContent>
                      <CommentDate>{comment.date}</CommentDate>
                    </CommentContents>
                  </Comment>
                ))}
              </Comments>
              <CommentInputContainer>
                <CommentInput
                  placeholder="댓글을 입력하세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <CommentButton onClick={addComment}>
                  <img src={arrow} width="65%"></img>
                </CommentButton>
              </CommentInputContainer>
            </CommentSection>
          </>
        )}
      </Content>
    </BackgroundContainer>
  );
};

export default ShareView;
