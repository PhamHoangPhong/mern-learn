import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContex';
const AddPostModal = () => {
    const {showPostModal, handleCloseModal, addPost, setToast, toast, postState} = useContext(PostContext)
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: ''
    })
    const {title, description, url, status} = newPost
    const onChangeModal = event => {
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }
    const onSubmitModal = async event => {
        event.preventDefault()
        handleCloseModal()
        const res = await addPost(newPost)
        if (res.success)
            setToast({...toast, show: true, message: res.message})
            setNewPost({
                title: '',
                description: '',
                url: '',
                status: ''
            })
    }
  return (
    <>
        <Modal show={showPostModal} onHide={handleCloseModal} >
            <Modal.Header style={{'background': '#198754', 'color': 'white'}} closeButton>
                <Modal.Title  className='font-text' >What you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmitModal}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Enter your skill you want to learn" 
                            name='title' 
                            required aria-describedby='title-help' 
                            onChange={onChangeModal}
                            value={title}
                        />
                        <Form.Text id='title-help'>Require</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            as="textarea" 
                            rows={3} type="text" 
                            placeholder="Enter description" 
                            name='description'
                            onChange={onChangeModal}
                            value={description}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Enter url" 
                            name='url' 
                            onChange={onChangeModal} 
                            value={url}
                        />
                    </Form.Group>
                    <div>
                        <Form.Check
                            inline
                            label="TO LEARN"
                            name="status"
                            type='radio'
                            value="TO LEARN"
                            onChange={onChangeModal}
                        />
                        <Form.Check
                            inline
                            label="LEARNING"
                            name="status"
                            type='radio'
                            value='LEARNING'
                            onChange={onChangeModal}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
  )
}

export default AddPostModal