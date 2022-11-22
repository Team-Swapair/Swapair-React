import { keyboard } from '@testing-library/user-event/dist/keyboard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Dropdown, InputGroup, DropdownButton, FormGroup } from 'react-bootstrap'
import '../assets/card1.css'
import { Link } from 'react-router-dom';

const Home = ()=> {

  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("BOTH");
  const [category, setCategory] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = ({ target: { value } }) => setKeyword(value);
  const handleCategory = (e)=>{setCategory(e.target.value);};
  const handleFilter = (e)=>{setFilter(e.target.value);};

  let userId = sessionStorage.getItem('userId');
  console.log("userId"+userId);

  const handleSubmit = (event) =>{
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
              <select
                variant="outline-secondary"
                title="카테고리"
                id="input-group-dropdown-3"
                onChange={handleCategory}
              >
                <option value="0" >전체</option>
                <option value="3" >아이돌</option>
                <option value="2" >포켓몬</option>
                <option value="1" >LP</option>
              </select>
              <Form.Control value={keyword} onChange={handleChange} placeholder="검색어를 입력하시오" />
              <select
                variant="outline-secondary"
                title="전체"
                id="input-group-dropdown-4"
                align="end"
                onChange={handleFilter}
              >
                <option value="BOTH" >전체</option>
                <option value="WANT" >구해요</option>
                <option value="HAVE" >있어요</option>
              </select>
              <Button className='' variant="secondary" type="submit" disabled={disabled}>
                검색
              </Button>
            </InputGroup>
          </FormGroup>
        </Form>
        
      </div>
      
      <Container >
        <Row xs={1} md = {2} xl={3} className="justify-content-center mt-5" >
          {
            data.map( (item)=>{
              return(
                <Col>
                  <Card className='m-2' style={{ width: '26rem', height: '26rem' }} bg={'secondary'} text={'white'} >
                  <Link to={`/postView/${item.postId}`} style={{ textDecoration: 'none', color:'white' }}>
                    <Card.Img id='card-img' height={'290rem'} variant="top" src={item.haveImage} />
                    <Card.Body>
                      <Card.Title>{item.postTitle}</Card.Title>
                      <Container>
                        <Row>
                          <Col xs={3}> 있어요 </Col>
                          {
                            item.haveGoodsList.map(goods => {
                              return (
                                <Col id='txt-line' sm>
                                  {goods.goodsName}
                                </Col>
                              )
                            })
                          }
                        </Row>
                        <Row>
                          <Col xs={3}> 구해요 </Col>
                          {
                            item.wantGoodsList.map(goods => {
                              return (
                                <Col id='txt-line' sm>
                                  {goods.goodsName}
                                </Col>
                              )
                            })
                          }
                        </Row>
                      </Container>
                    </Card.Body>
                    </Link>
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