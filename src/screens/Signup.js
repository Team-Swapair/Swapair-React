import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  let duplicateEmail;
  let duplicatePhoneNumber;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if (!email || !password || !phoneNumber) {
    //   alert('빈칸이 존재합니다. 모든 항목을 채워주세요');
    // }
    if (!email || !password) {
      alert('빈칸이 존재합니다. 모든 항목을 채워주세요');
    } else {
      let { data } = await axios.get(
        `http://localhost:8080/v1/user/duplicate/email/${email}`
      );

      duplicateEmail = data;

      // data = await axios.get(
      //   `http://localhost:8080/v1/user/duplicate/phoneNumber/${phoneNumber}`
      // );
      // duplicatePhoneNumber = data.data;
    }

    if (duplicateEmail === true)
      alert('중복된 이메일 입니다. 다시 입력해주세요');

    // if (duplicatePhoneNumber === true)
    //   alert('이미 존재하는 핸드폰 번호입니다. 다시 입력해주세요');

    // if (duplicateEmail === false && duplicatePhoneNumber === false) {
    //   await axios.post('http://localhost:8080/v1/user', {
    //     email: email,
    //     password: password,
    //     phoneNumber: phoneNumber,
    //   });
    //   navigate('/Signin');
    // }

    if (duplicateEmail === false) {
      await axios.post('http://localhost:8080/v1/user', {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });
      navigate('/Signin');
    }
  };

  return (
    <SignupFull>
      <SignupText>
        <h3>Signup</h3>
      </SignupText>
      <form onSubmit={onSubmitHandler}>
        <SignupContainer>
          <SignupHeader>Email</SignupHeader>
          <SignupInput
            name="email"
            type="email"
            placeholder="swapair123@gmail.com"
            value={email}
            onChange={onEmailHandler}
          />
        </SignupContainer>
        <SignupContainer>
          <SignupHeader>Password </SignupHeader>
          <SignupInput
            name="password"
            type="password"
            placeholder="@swapair123"
            value={password}
            onChange={onPasswordHandler}
          />
        </SignupContainer>
        <SignupContainer>
          <SignupHeader>PhoneNumber</SignupHeader>
          <SignupPhoneNumberWrapper>
            {/* <SignupInput
              Email="핸드폰번호"
              type="text"
              placeholder="010-1111-2222"
              value={phoneNumber}
              onChange={onPhoneNumberHandler}
            /> */}
            <Link to="/PhoneSignUp">
              <SignupPhoneNumberBtn type="submit">
                인증하기
              </SignupPhoneNumberBtn>
            </Link>
          </SignupPhoneNumberWrapper>
          <button type="submit">Signup</button>
        </SignupContainer>
      </form>
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

const SignupText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SignupHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SignupInput = styled.input`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SignupPhoneNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const SignupPhoneNumberBtn = styled.button`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;
