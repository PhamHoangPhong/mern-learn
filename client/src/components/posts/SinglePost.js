import React from 'react'
import Card from 'react-bootstrap/Card'
import ActionButtons from './ActionButtons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
const SinglePost = ({post: {_id, title, description, status, url}}) => (
    <Card className="shadow" border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
        
        <Card.Body className='font-text'>
            <Card.Title>
                <Row>
                    <Col xs={6}>
                        <p className='post-title mb-2'>{title}</p>
                        <small>
                            <Badge pill bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                                {status}
                            </Badge>
                        </small>
                    </Col>
                    <Col xs={6} className='text-right'>
                        <ActionButtons url={url} _id={_id} title={title} status={status} description={description} />
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text className='mt-3' style={{'color': '#6c757d'}}>{description}</Card.Text>
        </Card.Body>
    </Card>
)

export default SinglePost