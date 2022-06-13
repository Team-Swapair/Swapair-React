import React, { useState } from 'react';
import styled from 'styled-components';

function Signup() {
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setPhone(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <SignupFull>
      <SignupInput
        name="아이디"
        type="text"
        placeholder="id"
        value={id}
        onChange={onIdHandler}
      />
      <SignupInput
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onPasswordHandler}
      />
      <SignupPhoneWrapper>
        <SignupInput
          id="핸드폰번호"
          type="text"
          placeholder="010-1111-2222"
          value={phone}
          onChange={onEmailHandler}
        />
        <SignupPhoneBtn>인증하기</SignupPhoneBtn>
      </SignupPhoneWrapper>
      <button type="submit" onSubmit={onSubmit}>
        계정 생성하기
      </button>
    </SignupFull>
  );
}

export default Signup;

const SignupFull = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignupInput = styled.input`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin: 10px;
`;

const SignupPhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const SignupPhoneBtn = styled.button`
  position: absolute;
  width: 100px;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
`;
