import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function Signin() {
  let userId;
  let authenticated;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { data } = await axios.post('http://localhost:8080/v1/user/login', {
      email: email,
      password: password,
    });

    userId = data;
    authenticated = userId !== -1 ? true : false;

    if (authenticated) navigate('/');
    else alert('해당 유저 없음');
  };

  return (
    <SigninFull>
      <SigninText>
        <h3>로그인</h3>
      </SigninText>
      <form onSubmit={onSubmitHandler}>
        <SigninContainer>
          <SigninInput>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="swapair123@gmail.com"
                value={email}
                onChange={onEmailHandler}
              />
            </Form.Group>
          </SigninInput>
        </SigninContainer>
        <SigninContainer>
          <SigninInput>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="@swapair123"
                value={password}
                onChange={onPasswordHandler}
              />
            </Form.Group>
          </SigninInput>
          <SigninBtn>
            <div className="d-grid gap-2">
              <Button type="submit"> 로그인 </Button>
            </div>
          </SigninBtn>
        </SigninContainer>
      </form>
    </SigninFull>
  );
}

export default Signin;

const SigninFull = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SigninText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const SigninContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SigninInput = styled.div`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SigninBtn = styled.div`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
