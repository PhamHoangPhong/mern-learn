import { useState, useEffect, useContext } from "react";
import { PostContext } from '../contexts/PostContex';
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from "../components/posts/UpdatePostModal";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import ToastContainer from 'react-bootstrap/ToastContainer'
const Dasboard = () => {
  const {authState: {user: {username}}} = useContext(AuthContext)
  const {postState: {postFinded, post, postLoading}, getPosts, handleShowModal, toast: {show, message}, setToast} = useContext(PostContext)
  useEffect(() => getPosts(), [])
  let body = null
  if (postLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
      <Spinner animation="border" variant="info" />
  </div>
    )
  } else if (post.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as='h2'>
            Hi {username}
          </Card.Header>
          <Card.Body>
            <Card.Title>Well Come To My App</Card.Title>
            <Card.Text>Click the button below to track your first skill to learn</Card.Text>
            <Button variant='primary' onClick={handleShowModal}>LearnIt</Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {post.map(post => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger placement='left' overlay={<Tooltip className="tooltip">Add a new thing to lern</Tooltip>}>
          <div className="btn-floating">
            <IconContext.Provider value={{ color: "#ffb7c5", className: "global-class-name" }}>
                <BsFillPlusCircleFill onClick={handleShowModal} className='btn-floating-icon'  />
            </IconContext.Provider>
          </div>
        </OverlayTrigger>
      </>
    )
  }
  const onCloseToast = () => {
    setToast({show: false, message: '' })
  }
  return (
    <>
      <AddPostModal />
      {postFinded !== null && <UpdatePostModal />}
      {body}
      <ToastContainer position="top-end" className="p-3 in-top">
          <Toast show={show} onClose={onCloseToast} delay={2000} autohide>
              <Toast.Header style={{background: '#dc3545'}}>
                  <strong className="me-auto text-white">Admin</strong>
                  <small className="text-white">just recently</small>
              </Toast.Header>
              <Toast.Body>{message}</Toast.Body>
          </Toast>
      </ToastContainer>
    </>
  )
}

export default Dasboard