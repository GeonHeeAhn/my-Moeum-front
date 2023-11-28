import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import WritePost from './Pages/WritePost';
import ViewPost from './Pages/ViewPost';
import './App.css';
import AddName from './Pages/AddName';
import IsNewFriend from './Pages/IsNewFriend';
import IsSavedFriend from './Pages/IsSavedFriend';
import FaceRecogniton from './Pages/FaceRecogniton';
import IsAnyoneMore from './Pages/IsAnyoneMore';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Binder from './Pages/Binder';
import Settings from './Pages/Settings';
import Map from './Pages/Map';
import Entrance from './Pages/Entrance';
import ShareView from './Pages/ShareView';
import SelectFriend from './Pages/SelectFriend';
import HomeScreen from './Pages/HomeScreen';
import FriendPostList from './Pages/FriendPostList';

//axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL =
  'http://ec2-15-164-103-67.ap-northeast-2.compute.amazonaws.com:5000';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/posting" element={<WritePost />} />
        <Route path="/viewpost/:postId" element={<ViewPost />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/friendpostlist/:id" element={<FriendPostList />} />
        <Route path="/addname" element={<AddName />} /> /* 친구의 이름이
        무엇인가요 */
        <Route path="/isnewfriend" element={<IsNewFriend />} /> /* (새로운
        친구)님이 맞나요? */
        <Route path="/issavedfriend" element={<IsSavedFriend />} /> //@@님이
        맞나요?
        <Route path="/isanyonemore" element={<IsAnyoneMore />} /> /* !추가로
        등록하실 친구가 있나요? */
        <Route path="/selectfriend" element={<SelectFriend />} /> //친구목록에서
        친구 선택
        <Route path="/facerecognition" element={<FaceRecogniton />} /> //얼굴
        인식 화면
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/binder" element={<Binder />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/map" element={<Map />} />
        <Route path="/share/:postId" element={<ShareView />} />
      </Routes>
    </Router>
  );
}

export default App;
