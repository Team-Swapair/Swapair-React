import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Profile() {
  let userId = sessionStorage.getItem('userId');
  const [userData, setUserData] = useState('');
  const [userFeedData, setUserFeedData] = useState([]);
  const [feedId, setFeedId] = useState('');

  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:8080/v1/user/${userId}`);
    setUserData(data);
  };

  const getUserFeed = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/v1/user/${userId}/posts`
    );
    setUserFeedData(data);
  };
  console.log(userFeedData);

  useEffect(() => {
    getUser();
    getUserFeed();
  }, []);

  return (
    <StyledProfile>
      <StyledProfileContainer>
        <StyledUserInfo>
          <StyledProfileImage />
          <StyledUserId>
            <span>Email: </span> {userData.email}
          </StyledUserId>
        </StyledUserInfo>
        <StyledFeedList>
          <StyledFeedHeader>
            <StyledFeedBlock>No.</StyledFeedBlock>
            <StyledFeedBlock>Title</StyledFeedBlock>
            <StyledFeedBlock>Category</StyledFeedBlock>
          </StyledFeedHeader>
          {console.log(userFeedData)}
          {userFeedData.map(({ postId, postTitle, postCategory }, i) => (
            <StyledFeedBody key={postId}>
              <StyledFeedBlock>{i + 1}</StyledFeedBlock>
              <StyledFeedBlock>{postTitle}</StyledFeedBlock>
              <StyledFeedBlock>{postCategory}</StyledFeedBlock>
            </StyledFeedBody>
          ))}
        </StyledFeedList>
      </StyledProfileContainer>
    </StyledProfile>
  );
}

export default Profile;

const StyledProfile = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledProfileContainer = styled.div`
  display: flex;
  height: 80%;
`;

const StyledUserInfo = styled.div``;

const StyledProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: salmon;
`;

const StyledUserId = styled.div`
  margin-top: 15px;
`;
const StyledFeedList = styled.ul`
  width: 700px;
  list-style: none;
`;
const StyledFeedHeader = styled.li`
  display: flex;
  justify-content: space-between;
`;
const StyledFeedBody = styled.li`
  display: flex;
  justify-content: space-between;
`;
const StyledFeedBlock = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  word-break: break-all;
`;
