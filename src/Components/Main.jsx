import styled from "styled-components";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: calc(100vh-80px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 2.2em 0px 0px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;
export default Main;
