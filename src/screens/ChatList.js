import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Col, Row, Container, Image, Badge, Card, Button} from 'react-bootstrap'
import axios from 'axios'; 
import { Link, useParams, useNavigate } from 'react-router-dom';

function ChatList() {

  const [data, setData] = useState([]);
  let {no} = useParams();

  const move = useNavigate();

  const movetoChat = (e) => {
    console.log("post is"+e)
    move('/ChatPage/'+e.randomId, {
      state: {
          postId: e.postId
        }
      }
    )
  };


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
                        <Row onClick={() => movetoChat(post)} className='p-2 m-2' style={{ width: '40em', border:'3px solid gray', borderRadius: '10px'}}>
                            <Col md="auto">
                                <Image width={'70rem'} rounded="true" src={post.haveImage}/>
                            </Col>
                            <Col>
                            <Container>
                              <Row>
                                {post.postTitle}
                              </Row>
                              <Row>
                                {post.message}
                              </Row>
                            </Container>   
                            </Col>
                        </Row>
                        </Container>
                      )
                    })
            }
    </Container>
  );
}

export default ChatList;