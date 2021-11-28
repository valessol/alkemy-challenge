import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Card from './Card'

const CardList = ({heros}) => {
    
    return (
        <Container >
            <Row className="justify-content-center">
                { heros &&
                    heros.map((item, index) => (
                        <Col md={4} key={index}>
                            <Card {...item} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default CardList
