import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Col, Row, Container, Image, Badge, Card, Button} from 'react-bootstrap'
import axios from 'axios';
import '../assets/card1.css'
import { Link, useParams } from 'react-router-dom';

function Post() {
  const [data, setData] = useState([]);
  const [haveList, setHaveList] = useState([]);
  const [wantList, setWantList] = useState([]);

  let { no } = useParams();

  console.log('id is ', { no });

  useEffect(()=>{
    const id  = no.no;
    axios.get('http://localhost:8080/v1/post/'+no)
    .then(res =>{
      console.log(res.data)

        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log('list is', data.haveGoodsList);

  return (
    <Container className='m-5 justify-content-center'>
          <Card border="secondary" className='p-2'>
            <Card.Header>
              <Container>
              { data.isDoubted&&
                  <h4><Badge className='mb-2' bg="danger">이 게시물은 조작 게시물로 의심됩니다.</Badge></h4>
              }
                <h4><Badge className='mb-2' bg="secondary">있어요</Badge></h4>
                <Row className='justify-content-center mb-2'>
                  <Col xs={8}>
                    <Image rounded="true" id='card-img' height={'300rem'} src={data.haveImage} />
                  </Col>
                </Row>
                <Row >
                  {
                    data.haveGoodsList && data.haveGoodsList.map((goods) => {
                      return (
                        <div>
                          {goods.goodsName}
                        </div>
                      )
                    })
                  }
                </Row>
              </Container>
              <Container className='mt-5'>
                <h4><Badge className='mb-2' bg="secondary">구해요</Badge></h4>
                <Row className='justify-content-center mb-2' >
                  <Col xs={8}>
                    <Image rounded="true" id='card-img' height={'300rem'} src={data.wantImage} />
                  </Col>
                </Row>
                <Row>
                  {
                    data.wantGoodsList && data.wantGoodsList.map((goods) => {
                      return (
                        <div >
                          {goods.goodsName}
                        </div>
                      )
                    })
                  }
                </Row>
              </Container>
            </Card.Header>
            <Card.Body>
              <Container>
                <h5 ><Row >{data.postTitle}</Row></h5>
                <Row className='mt-3'>{data.postContent}</Row>
              </Container>
            </Card.Body>
          </Card>
          <Link to ={`/chat/${no}`}>
            <Button className='mt-3'>거래 채팅하기</Button>
          </Link>  
    </Container>
  );
}

export default Post;
