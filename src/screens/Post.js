import React from 'react';
import styled from 'styled-components';

function Post() {
  return (
    <StyledPost>
      <StyledPostContainer>
        <StyledPostCategory>포켓몬</StyledPostCategory>
        <StyledPostGoodsContainer>
          <StyledPostHaveGoods>
            <StyledPostGoods>
              <StyledPostGoodsHeader>HAVE</StyledPostGoodsHeader>
              <StyledPostGoodsImageWrapper>
                <StyledPostGoodsImage />
                <StyledPostGoodsImage />
                <StyledPostGoodsImage />
              </StyledPostGoodsImageWrapper>
              <StyledPostGoodsName>파이리</StyledPostGoodsName>
            </StyledPostGoods>
          </StyledPostHaveGoods>
          <StyledPostWantGoods>
            <StyledPostGoods>
              <StyledPostGoodsHeader>WANT</StyledPostGoodsHeader>
              <StyledPostGoodsImageWrapper>
                <StyledPostGoodsImage />
                <StyledPostGoodsImage />
                <StyledPostGoodsImage />
              </StyledPostGoodsImageWrapper>
              <StyledPostGoodsName>별가사리</StyledPostGoodsName>
            </StyledPostGoods>
          </StyledPostWantGoods>
        </StyledPostGoodsContainer>
        <StyledPostContent>
          <div>제목</div>
          <div>포켓몬 띠뿌띠뿌씰 교환~</div>
          <div>내용</div>
          <div>파이리어쩌구</div>
          <div>다른 물품 제시해도 괜찮아요</div>
        </StyledPostContent>
      </StyledPostContainer>
    </StyledPost>
  );
}

export default Post;

const StyledPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const StyledPostContainer = styled.div`
  width: 80%;
  height: 80%;
  border: 1px solid black;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPostCategory = styled.div`
  position: absolute;
  left: 50px;
  top: 50px;
  background-color: dodgerblue;
`;

const StyledPostGoodsContainer = styled.div`
  width: 50%;
`;

const StyledPostHaveGoods = styled.div``;

const StyledPostWantGoods = styled.div``;

const StyledPostGoods = styled.div``;

const StyledPostGoodsHeader = styled.div``;

const StyledPostGoodsImageWrapper = styled.div`
  display: flex;
`;

const StyledPostGoodsImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  background-color: lime;
`;
const StyledPostGoodsName = styled.div``;

const StyledPostContent = styled.div`
  width: 50%;
  border: 1px solid black;
  margin-top: 20px;
  & > div:last-child {
    margin-top: 20px;
  }
`;
