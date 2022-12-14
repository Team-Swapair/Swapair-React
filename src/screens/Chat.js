import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Badge, Card, Container, Stack, Image, Row, Col } from "react-bootstrap";

const ROOM_SEQ = 1;

const App = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [post, setPost] = useState([]);

  
  let {no} = useParams();
  

  useEffect(() => {
    connect();
    axios.get('http://localhost:8080/v1/post/'+no)
    .then(res =>{
        setPost(res.data);
        })
    .catch(err => console.log(err))
    setUser(sessionStorage.getItem('userId'));
    return () => disconnect();
    
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
    //   webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        axios.get('http://localhost:8080/v1/chatroom/createroom/'+no)
    .then(res =>{
          setRoom(res.data);
          console.log("room is "+ room);
          subscribe(res.data);
          })
    .catch(err => console.log(err))
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = (rnum) => {
    client.current.subscribe(`/sub/chat/${rnum}`, ({ body }) => {
        setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
      });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }
    // console.log("sender is"+user);
    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({ roomSeq: room, sender: user, message }),
    });
    
    setMessage("");
  };

  return (
    <Container >
        <Row style={{ width: '40em', border:'3px solid gray', borderRadius: '10px'}} className="p-3 mb-4">
          
          <Col md="auto">
            <Image width={'130rem'} rounded="true"  src={post.haveImage}/>
          </Col>
          <Col >
          <Container >
            <Row  className="mt-3 mb-5">
              <Col md="auto"><Badge bg="secondary" className="p-2">있어요</Badge></Col>
                  {post.haveGoodsList && post.haveGoodsList.map((goods) => {
                    return (
                      <Col>
                      <Container>
                        <Row>
                        <Col md="auto">
                            {goods.goodsName}      
                        </Col>
                        <Col md="auto">
                            {goods.price}
                          </Col>
                          </Row>
                      </Container>
                      </Col>
                    );
                  })}
            </Row>
            <Row  >
              <Col md="auto"><Badge bg="secondary" className="p-2">구해요</Badge></Col>
              {post.wantGoodsList && post.wantGoodsList.map((goods) => {
                    return (
                      <Col>
                      <Container>
                        <Row>
                        <Col md="auto">
                            {goods.goodsName}      
                        </Col>
                        <Col md="auto">
                            {goods.price}
                          </Col>
                          </Row>
                      </Container>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
          </Col>     
        </Row>
          
      <div style={{ width: '29em', border:'3px solid black', borderRadius: '10px'}} className="p-4">
      {chatMessages && chatMessages.length > 0 && (
        <Stack className="" gap={3}>
          {chatMessages.map((_chatMessage, index) =>{ 
            console.log("u "+ user +"se "+chatMessages.sender);
            if(user===_chatMessage.sender){ 
                console.log("they are same");
                return(
                  <div className=" ms-auto">
                <Badge key={index} bg="secondary" className="justify-content-end p-2">{_chatMessage.message}</Badge>
                </div>
                )
            }else{
                return(
                  <div>
                    <Badge key={index} bg="dark" className="p-2">{_chatMessage.message}</Badge>
                    </div>
                    )
            }
          })}
        </Stack>
      )}
        
      <div className="mt-3" >
        <input
          style={{ width: '22em'}}
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
        </div>
      </div>
    </Container>
  );
};

export default App;