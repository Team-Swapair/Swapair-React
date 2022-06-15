import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <h3>SignIn</h3>
      </SigninText>
      <form onSubmit={onSubmitHandler}>
        <SigninContainer>
          <SigninHeader>Email</SigninHeader>
          <SigninInput
            name="email"
            type="email"
            placeholder="swapair123@gmail.com"
            value={email}
            onChange={onEmailHandler}
          />
        </SigninContainer>
        <SigninContainer>
          <SigninHeader>Password </SigninHeader>
          <SigninInput
            name="password"
            type="password"
            placeholder="@swapair123"
            value={password}
            onChange={onPasswordHandler}
          />
          <button type="submit">signin</button>
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

const SigninHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SigninInput = styled.input`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;
