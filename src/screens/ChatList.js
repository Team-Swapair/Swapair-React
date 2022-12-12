import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Col, Row, Container, Image, Badge, Card, Button} from 'react-bootstrap'
import axios from 'axios'; 
import { Link, useParams } from 'react-router-dom';

function ChatList() {

  const [data, setData] = useState([]);
  let {no} = useParams();

  console.log("id is ",{no});

  useEffect(()=>{
    axios.get('http://localhost:8080/v1/chatroom/'+sessionStorage.getItem('userId'))
    .then(res =>{
        setData(res.data);
        })
    .catch(err => console.log(err))

  },[]);
  
  return (

    <Container>
            {
                data && data.map((post) => {
                    return (
                        <Container>
                        <Row>
                            <Col>
                                <Image width={'130rem'} rounded="true" src={post.haveImage}/>
                            </Col>
                            <Col>
                                {post.postTitle}
                            </Col>
                        </Row>
                        <Row>
                            {post.message}
                        </Row>
                        </Container>
                      )
                    })
            }
    </Container>
  );
}

export default ChatList;