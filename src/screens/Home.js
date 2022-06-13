import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Dropdown, InputGroup, DropdownButton, FormControl } from 'react-bootstrap'

const Home = () => {

  let[postTitle, changeTitle] = useState(['LP판 삽니다','포켓몬 갖고싶다']);
  let mainImg = "https://stickershop.line-scdn.net/stickershop/v1/product/12124486/LINEStorePC/main.png;compress=true";
  let postContent = "메인내용입니다."

  return (

   
    <div>
      <Form >
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <Form.Group className="m-3 " controlId="formsearchKey">
              <Form.Control placeholder="searchKeyword" />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button className='my-3' variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="mx-5">
        <InputGroup>
          <DropdownButton
            variant="outline-secondary"
            title="카테고리"
            id="input-group-dropdown-3"
          >
            <Dropdown.Item href="#">전체</Dropdown.Item>
            <Dropdown.Item href="#">아이돌</Dropdown.Item>
            <Dropdown.Item href="#">포켓몬</Dropdown.Item>
            <Dropdown.Item href="#">LP</Dropdown.Item>
          </DropdownButton>
          <Form.Control placeholder="검색어를 입력하시오" />
          <DropdownButton
            variant="outline-secondary"
            title="전체"
            id="input-group-dropdown-4"
            align="end"
          >
            <Dropdown.Item href="#">전체</Dropdown.Item>
            <Dropdown.Item href="#">구해요</Dropdown.Item>
            <Dropdown.Item href="#">있어요</Dropdown.Item>
          </DropdownButton>
          <Button className='' variant="secondary" type="submit">
              검색  
          </Button>
        </InputGroup>
      </div>
      
      <Container>
        <Row xs={1} md = {2} lg ={3} className="center-block mt-5" >
          <Col>
            <Card style={{ width: '18rem', height: '26rem'}} bg = {'secondary'} text={'white'} >
              <Card.Img variant="top" src={mainImg} />
              <Card.Body>
                <Card.Title>{postTitle[0]}</Card.Title>
                <Card.Text>
                  {postContent}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }} bg = {'secondary'} text={'white'} >
              <Card.Img variant="top" src="https://stickershop.line-scdn.net/stickershop/v1/product/12124486/LINEStorePC/main.png;compress=true" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card></Col>
          <Col>
            <Card style={{ width: '18rem' }} bg = {'secondary'} text={'white'} md = {1}>
              <Card.Img variant="top" src="https://stickershop.line-scdn.net/stickershop/v1/product/12124486/LINEStorePC/main.png;compress=true" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card></Col>
          <Col>4 of 1</Col>
          <Col>5 of 1</Col>
          <Col>6 of 1</Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home