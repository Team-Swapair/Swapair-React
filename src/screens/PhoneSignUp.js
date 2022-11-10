import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Button } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';

const PhoneSignUp = () => {
  const [error, setError] = useState('');
  const [number, setNumber] = useState('');
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const setupRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (number === '' || number === undefined)
      return setError('유효한 핸드폰 번호를 입력하세요');
    try {
      const response = await setupRecaptcha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (otp === '' || otp === null) return;
    try {
      await result.confirm(otp);
      navigate('/SignUp', { state: number });
    } catch (err) {
      setError(err.message);
    }
  };

  const goBack = async (e) => {
    navigate(-1);
  };

  return (
    <div className="auto">
      <PhoneSignUpFull>
        <h5>번호인증</h5>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            &nbsp;
            <PhoneInput
              defaultCountry="KR"
              value={number}
              onChange={setNumber}
              placeholder="010-1111-2222"
            />
            <div id="recaptcha-container"></div>
          </Form.Group>

          <div className="button-right">
            <Button variant="secondary" onClick={goBack}>
              취소
            </Button>
            &nbsp;
            <Button type="submit" variant="primary">
              제출
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? 'block' : 'none' }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="인증번호"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Button variant="secondary" onClick={goBack}>
              취소
            </Button>
            &nbsp;
            <Button type="submit" variant="primary">
              인증
            </Button>
          </div>
        </Form>
      </PhoneSignUpFull>
    </div>
  );
};

export default PhoneSignUp;

const PhoneSignUpFull = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
