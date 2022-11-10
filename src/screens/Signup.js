import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function Signup() {
  let duplicateEmail = false;
  let duplicatePhoneNumber = false;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const phoneNumber = useLocation().state;

  const goToPhoneSignUp = async (e) => {
    navigate('/PhoneSignUp', { state: { email: email, password: password } });
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password || !phoneNumber) {
      alert('빈칸이 존재합니다. 모든 항목을 채워주세요');
    } else {
      axios
        .get(`http://localhost:8080/v1/user/duplicate/email/${email}`)
        .catch(() => (duplicateEmail = true));

      await axios
        .get(
          `http://localhost:8080/v1/user/duplicate/phoneNumber/${phoneNumber}`
        )
        .catch(() => (duplicatePhoneNumber = true));
    }

    if (duplicateEmail === true)
      alert('중복된 이메일 입니다. 다시 입력해주세요');

    if (duplicatePhoneNumber === true)
      alert('이미 존재하는 핸드폰 번호입니다. 다시 입력해주세요');

    if (duplicateEmail === false && duplicatePhoneNumber === false) {
      await axios.post('http://localhost:8080/v1/user', {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });
      navigate('/Signin');
    }

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
        <h3>회원가입</h3>
      </SignupText>
      <form onSubmit={onSubmitHandler}>
        <SignupContainer>
          <SignupInput>
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
          </SignupInput>
        </SignupContainer>
        <SignupContainer>
          <SignupInput>
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
          </SignupInput>
        </SignupContainer>
        <SignupContainer>
          <SignupInput>
            <Form.Group className="mb" controlId="formGridCity">
              <Form.Label>전화번호</Form.Label>
            </Form.Group>
            <Button
              type="submit"
              variant="outline-dark"
              onClick={goToPhoneSignUp}
            >
              인증하기
            </Button>{' '}
          </SignupInput>
          <SignupBtn>
            <div className="d-grid gap-2">
              <Button type="submit"> 회원가입 </Button>
            </div>
          </SignupBtn>
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

const SignupInput = styled.div`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SignupBtn = styled.div`
  width: 300px;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
