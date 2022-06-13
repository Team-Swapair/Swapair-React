import React from 'react';
import styled from 'styled-components';

function Profile() {
  return (
    <StyledProfile>
      <StyledProfileContainer>
        <StyledUserInfo>
          <StyledProfileImage />
          <StyledUserId>
            <span>아이디: </span> seyon11@gmail.com
          </StyledUserId>
        </StyledUserInfo>
        <StyledFeedList>
          <StyledFeedHeader>
            <StyledFeedBlock>No.</StyledFeedBlock>
            <StyledFeedBlock>Title</StyledFeedBlock>
            <StyledFeedBlock>Category</StyledFeedBlock>
          </StyledFeedHeader>
          <StyledFeedBody>
            <StyledFeedBlock>1</StyledFeedBlock>
            <StyledFeedBlock>LP판 교환 원해요~</StyledFeedBlock>
            <StyledFeedBlock>LP</StyledFeedBlock>
          </StyledFeedBody>
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
