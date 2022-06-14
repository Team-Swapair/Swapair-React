import { keyboard } from '@testing-library/user-event/dist/keyboard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Dropdown, InputGroup, DropdownButton, FormGroup } from 'react-bootstrap'
import PostCard from '../components/PostCard'

const Home = () => {

  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("BOTH");
  const [category, setCategory] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = ({ target: { value } }) => setKeyword(value);

  const handleSubmit = async (event) =>{
    console.log("keyword is", keyword);
    console.log("filter is", filter);
    console.log("category is", category);
    setDisabled(true);
    event.preventDefault();
    axios.post('http://localhost:8080/v1/search/post',
      {categoryId: category, filter: filter, keyword: keyword})
      .then(res=>setData(res.data))
      .catch(err => console.log(err))
    setDisabled(false);
  };

  useEffect(()=>{
    axios.get('http://localhost:8080/v1/posts')
    .then(res =>
        setData(res.data))
    .catch(err => console.log(err))
  },[]);

  return (
   
    <div>
      <div className="m-5">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <InputGroup >
              <DropdownButton
                variant="outline-secondary"
                title="카테고리"
                id="input-group-dropdown-3"
                onSelect={(eventKey) => setCategory(eventKey)}
              >
                <Dropdown.Item eventKey={null} >전체</Dropdown.Item>
                <Dropdown.Item eventKey="3" >아이돌</Dropdown.Item>
                <Dropdown.Item eventKey="2" >포켓몬</Dropdown.Item>
                <Dropdown.Item eventKey="1" >LP</Dropdown.Item>
              </DropdownButton>
              <Form.Control value={keyword} onChange={handleChange} placeholder="검색어를 입력하시오" />
              <DropdownButton
                variant="outline-secondary"
                title="전체"
                id="input-group-dropdown-4"
                align="end"
                onSelect={(eventKey) => setFilter(eventKey)}
              >
                <Dropdown.Item eventKey="BOTH" >전체</Dropdown.Item>
                <Dropdown.Item eventKey="WANT" >구해요</Dropdown.Item>
                <Dropdown.Item eventKey="HAVE" >있어요</Dropdown.Item>
              </DropdownButton>
              <Button className='' variant="secondary" type="submit" disabled={disabled}>
                검색
              </Button>
            </InputGroup>
          </FormGroup>
        </Form>
        
      </div>
      
      <Container>
        <Row xs={1} md = {2} lg ={3} className="justify-content-center mt-5" >
          {
            data.map( item=>{
              return(
                <Col>
                  <Card className='m-2' style={{ width: '18rem', height: '26rem' }} bg={'secondary'} text={'white'} >
                    <Card.Img height={'250rem'} variant="top" src={item.haveImage} />
                    <Card.Body>
                      <Card.Title>{item.postTitle}</Card.Title>
                      <Card.Text>
                        {item.postTitle}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default Home