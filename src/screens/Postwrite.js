import React from 'react';
import {
  Form,
  Button,
  Container,
  Image,
  InputGroup,
  Badge,
  Row,
  Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Postwrite = () => {
  const [capchaImg, setCaptchaImg] = useState('');
  const [originImg, setOriginImg] = useState('');
  const [haveImg, setHaveImg] = useState('');
  const [wantImg, setWantImg] = useState('');
  const [searchHave, setSearchHave] = useState('');
  const [searchWant, setSearchWant] = useState('');
  const [goods, setGoods] = useState([]);
  const [haveGoods, setHaveGoods] = useState([]);
  const [wantGoods, setWantGoods] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [category, setCategory] = useState('');
  let [randomNumber, setRandomNumber] = useState('');
  const navigate = useNavigate();
  let [compareCap, setCompareCap] = useState('');

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const submitCaptcha = async (event) => {
    const formdata = new FormData();
    formdata.append('captchaImg', originImg);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };

    console.log('originImage', originImg);

    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

    await axios
      .post('http://localhost:5000/captcha', formdata, config, {})
      .then((res) => {
        compareCapValue(res.data.result);
      })
      .catch((err) => {
        setCompareCap(false);
        console.log(err);
      });

    //   axios.get('http://localhost:8080/v1/tmps')
    // .then((res)=>{setCap(res.data)})
    // .catch(err => console.log(err))
  };

  const handleSubmit = async (event) => {
    const wantIds = [];
    for (let i = 0; i < wantGoods.length; i += 1) {
      const id = wantGoods[i].goodsId;
      wantIds.push(id);
    }

    const haveIds = [];
    haveIds.push(haveGoods.goodsId);
    console.log('havegoods is', haveGoods);
    console.log('wantgoods is', wantGoods);

    event.preventDefault();
    axios
      .post('http://localhost:8080/v1/post/postwrite', {
        postTitle: postTitle,
        userId: sessionStorage.getItem('userId'),
        postContent: postContent,
        postCategory: category,
        wantImage: wantImg[0],
        haveImage: haveImg,
        haveGoodsList: haveIds,
        wantGoodsList: wantIds,
      })
      .then((res) => {
        navigate(`/postView/${res.data}`);
      })
      .catch((err) => console.log(err));
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleContent = (e) => {
    setPostContent(e.target.value);
  };

  const handleTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const addWant = (e) => {
    setWantGoods(wantGoods.concat(e));
  };

  const addHave = (e) => {
    setHaveGoods(e);
  };

  const filterHaveGoods = goods
    .filter((p) => {
      return p.goodsName
        .replace(' ', '')
        .toLocaleLowerCase()
        .includes(searchHave.toLocaleLowerCase().replace(' ', ''));
    })
    .slice(0, 6);

  const filterWantGoods = goods
    .filter((p) => {
      return p.goodsName
        .replace(' ', '')
        .toLocaleLowerCase()
        .includes(searchWant.toLocaleLowerCase().replace(' ', ''));
    })
    .slice(0, 6);

  useEffect(() => {
    axios
      .get('http://localhost:8080/v1/goods')

      .then((res) => setGoods(res.data))
      .catch((err) => console.log(err));
    console.log(goods);
  }, []);

  const onHaveChange = (e) => {
    setSearchHave(e.target.value);
  };
  const onWantChange = (e) => {
    setSearchWant(e.target.value);
  };

  const onLoadCapFile = (fileBlob) => {
    setOriginImg(fileBlob);
    const imageURL = URL.createObjectURL(fileBlob);
    console.log(fileBlob);
    setCaptchaImg(imageURL);
  };

  const onLoadHaveFile = (fileBlob) => {
    const imageURL = URL.createObjectURL(fileBlob);
    console.log(imageURL);
    setHaveImg(imageURL);
  };

  const onLoadWantFile = (fileBlob) => {
    const nowImageList = fileBlob.target.files;
    const imageUrls = [...wantImg];

    for (let i = 0; i < nowImageList.length; i += 1) {
      const imgURL = URL.createObjectURL(nowImageList[i]);
      imageUrls.push(imgURL);
    }
    setWantImg(imageUrls);
  };

  const generateRandomNumber = () => {
    let str = '';

    str += Math.floor(Math.random() * 4);

    const number = ['13780', '16324', '23780', '45003'];
    setRandomNumber(number[str]);
    console.log(str);
  };

  const compareCapValue = (e) => {
    if (randomNumber === e) {
      setCompareCap(true);
      console.log('setCompareCap', compareCap);
    } else {
      setCompareCap(false);
    }
    console.log('aaa', compareCap);
  };
  return (
    <Container className="m-5 justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>카테고리</Form.Label>
          <Form.Select className="" onChange={handleCategory}>
            <option>카테고리를 선택하세요.</option>
            <option value="3">아이돌</option>
            <option value="2">포켓몬</option>
            <option value="1">LP</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>제목</Form.Label>
          <Form.Control
            placeholder="제목을 입력해주세요."
            onChange={handleTitle}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>캡챠 인증</Form.Label>
          <Form.Group className="mb-2">
            <Form.Text>
              제공된 문자열을 하단 사진의 가이드라인에 맞춰 작성하여 사진을
              업로드 해 주세요.
            </Form.Text>
            <Form.Group>
              <Image
                className="mb-3"
                src="\image\example.jpg"
                height={'300rem'}
              />
            </Form.Group>
            <Form.Text>오른쪽 숫자를 기입해주세요</Form.Text>
            <Button className="mx-2">{randomNumber}</Button>
            {/* <Button className="mx-2">{randomNumber}</Button> */}
          </Form.Group>
          <div>
            <div>업로드된 이미지</div>
            {capchaImg && (
              <Image className="mb-3" src={capchaImg} height={'300rem'} />
            )}
          </div>
          <Form.Control
            className="mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => {
              onLoadCapFile(e.target.files[0]);
            }}
          />

          <Button onClick={submitCaptcha}>인증 사진 등록</Button>
          {compareCap === true && (
            <Badge className="m-3">인증되었습니다.</Badge>
          )}
          {compareCap === false && (
            <Badge className="m-3">인증에 실패했습니다.</Badge>
          )}
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Have</Form.Label>
          <Col>
            <h4>
              <Badge bg="secondary">{haveGoods.goodsName}</Badge>
            </h4>
          </Col>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="등록할 물건 검색"
              value={searchHave}
              onChange={onHaveChange}
              className="mb-3"
            />
            <Container>
              <Row className="justify-content-left">
                {searchHave &&
                  filterHaveGoods.map((goods) => {
                    return (
                      <Col>
                        <h5>
                          <Badge bg="secondary" onClick={() => addHave(goods)}>
                            {goods.goodsName}
                          </Badge>
                        </h5>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
          </InputGroup>
          <div>
            {haveImg && (
              <Image className="mb-3" src={haveImg} height={'300rem'} />
            )}
          </div>
          <Form.Label>사진등록</Form.Label>
          <Form.Control
            className="mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => {
              onLoadHaveFile(e.target.files[0]);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Want</Form.Label>
          <Row className="justify-content-left">
            {wantGoods.map((goods) => {
              return (
                <Col>
                  <h4>
                    <Badge bg="secondary">{goods.goodsName}</Badge>
                  </h4>
                </Col>
              );
            })}
          </Row>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="등록할 물건 검색"
              value={searchWant}
              onChange={onWantChange}
              className="mb-3"
            />
            <Container>
              <Row className="justify-content-left">
                {searchWant &&
                  filterWantGoods.map((goods) => {
                    return (
                      <Col>
                        <h5>
                          <Badge bg="secondary" onClick={() => addWant(goods)}>
                            {goods.goodsName}
                          </Badge>
                        </h5>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
          </InputGroup>
          <Form.Label>사진 등록</Form.Label>
          <Container>
            {wantImg &&
              wantImg.map((img) => {
                return <Image className="m-1" src={img} height={'300rem'} />;
              })}
          </Container>
          <Form.Control
            className="mb-3"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              onLoadWantFile(e);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="특이사항을 입력하세요."
            size="0.5g"
            onChange={handleContent}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default Postwrite;
