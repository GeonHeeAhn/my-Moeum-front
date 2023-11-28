import React, { useEffect, useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import {
  TopBar,
  Title,
  Content,
  MapDiv,
  MoeumDiv,
  Moeum,
  Photo,
  Info,
  Date,
  Place,
  Friends,
  Dday,
} from '../Components/MapComponents';
import { NavBar } from '../Components/NavBar';
import useCurrentLocation from '../hooks/useGeoLocation';
import Spinner from '../Assets/Spinner.gif';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};

const Map = () => {
  const [postList, setPostList] = useState([]);
  const [currentLoc, setCurrentLoc] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [postLoading, setPostLoading] = useState(true);
  const postRef = useRef();

  const array = [
    '건희랑 진영이랑',
    '윤선이랑 영우랑',
    '건희랑 진영이랑 윤선이랑',
    '윤선이랑 유진이랑',
    '유진이랑 민주랑 윤선이랑',
  ];
  const { location, error: currentError } =
    useCurrentLocation(geolocationOptions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/posts?userId=${1}`,
          withCredentials: true,
        });
        console.log('sendApi : ' + response.status);
        postRef.current = response.data.posts;
        console.log(postRef.current);

        await Promise.all(
          postRef.current.map(async (post) => {
            if (
              post.imgPath.includes('.jpg') ||
              post.imgPath.includes('.png') ||
              post.imgPath.includes('.jpeg') ||
              post.imgPath.includes('.JPG') ||
              post.imgPath.includes('.PNG') ||
              post.imgPath.includes('.JPEG')
            ) {
              const response = await axios({
                method: 'GET',
                url: `/images/${post.imgPath}`,
                withCredentials: true,
                responseType: 'blob',
              });
              console.log('imgApi : ' + response.status);
              const blobUrl = URL.createObjectURL(new Blob([response.data]));
              console.log('이전: ' + post.imgPath);
              console.log('이후 : ' + blobUrl);
              post.imgPath = blobUrl;
            }
          }),
        );

        // 이미지 로딩이 완료되면 한 번만 호출
        setPostLoading(false);
        console.log(postRef.current);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
          } else if (error.request) {
            console.error(error.request);
          }
        } else {
          console.error(error);
        }
      } finally {
        console.log('끝');
      }
    };

    if (location && location.latitude && location.longitude) {
      setCurrentLoc({
        x: 37.552914,
        y: 126.942011,
      });
      setLoading(false);
      fetchData();
    }
  }, [location]); // Include location in the dependency array

  useEffect(() => {
    console.log('카카오맵 ' + postRef.current);
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      console.log('여기');
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        console.log('저기');
        if (container && currentLoc.x && currentLoc.y) {
          var options = {
            center: new window.kakao.maps.LatLng(currentLoc.x, currentLoc.y),
            level: 6,
          };

          const map = new window.kakao.maps.Map(container, options);

          var positions = postRef.current.map((post) => ({
            title: post.takenAt,
            latlng: new kakao.maps.LatLng(
              parseFloat(`${post.latitude}`),
              parseFloat(`${post.longitude}`),
            ),
          }));

          console.log(positions);

          positions.forEach((position) => {
            var imageSrc =
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

            var imageSize = new kakao.maps.Size(24, 35);

            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            var marker = new kakao.maps.Marker({
              map: map,
              position: position.latlng,
              title: position.title,
              image: markerImage,
            });
          });
          setLoading(false);
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    document.head.appendChild(kakaoMapScript);

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, [currentLoc]);

  const postOnClick = (id) => {
    navigate(`/viewpost/${id}`);
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title>지도</Title>
        </TopBar>
        {loading ? (
          <img
            src={Spinner}
            alt="로딩중"
            width="35%"
            style={{ marginTop: 60 }}
          />
        ) : (
          <MapDiv
            id="map"
            style={{ width: '100vw', height: '50vh', marginBottom: '30vh' }}
          />
        )}

        <MoeumDiv
          style={{
            overflowY: 'auto',
            maxHeight: '50vh',
            webkitOverflowScrolling: 'auto',
          }}
        >
          {postLoading ? (
            <img
              src={Spinner}
              alt="로딩중"
              width="35%"
              style={{ marginTop: 60 }}
            />
          ) : (
            postRef.current.map((post) => (
              <Moeum key={post.id} onClick={() => postOnClick(post.id)}>
                <Photo>
                  <img
                    src={post.imgPath}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </Photo>
                <Info>
                  <Date>2023-11-21</Date>
                  <Place>{post.location}</Place>
                  <Dday>{array[`${post.id % 5}`]}</Dday>
                </Info>
              </Moeum>
            ))
          )}
          <Moeum>
            <div style={{ width: '100vw', height: '6vh' }} />
          </Moeum>
        </MoeumDiv>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default Map;
