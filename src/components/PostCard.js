import React from 'react'
import {Card, Row, Col } from 'react-bootstrap'

const PostCard = (props) => {
    return (
        <Col>
            <Card style={{ width: '18rem', height: '26rem' }} bg={'secondary'} text={'white'} >
                <Card.Img variant="top" src={props.haveImage} />
                <Card.Body>
                    <Card.Title>{props.postTitle}</Card.Title>
                    <Card.Text>
                        {props.postTitle}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}