import React, { useState } from 'react';
import styled from 'styled-components';

function Signin() {
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setPhone(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.');
    }
  };

  return (
    <SigninFull>
      <SigninInput
        name="아이디"
        type="text"
        placeholder="id"
        value={id}
        onChange={onIdHandler}
      />
      <SigninInput
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onPasswordHandler}
      />
      <button type="submit" onSubmit={onSubmit}>
        로그인
      </button>
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

const SigninInput = styled.input`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin: 10px;
`;

const SigninPhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const SigninPhoneBtn = styled.button`
  position: absolute;
  width: 100px;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
`;
