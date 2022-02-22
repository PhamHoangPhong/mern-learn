import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContex';
const UpdatePostModal = () => {
    const {
        setToast, 
        toast, 
        postState: {postFinded}, 
        showEditPostModal, 
        setShowEditPostModal,
        updatePost
    } = useContext(PostContext)
    const [editPost, setEditPost] = useState(postFinded)
    useEffect(() => setEditPost(postFinded), [postFinded])
    const {title, description, url, status} = editPost
    const onChangeModal = event => {
        setEditPost({...editPost, [event.target.name]: event.target.value})
    }
    const onSubmitModal = async event => {
        event.preventDefault()
        const res = await updatePost(editPost)
        onCloseModal()
        if (res.success)
            setToast({...toast, show: true, message: res.message})
    }
    const onCloseModal = () => {
        setShowEditPostModal(false)
        setEditPost(postFinded)
    }
  return (
    <>
        <Modal show={showEditPostModal} onHide={onCloseModal} >
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
                            defaultChecked={status === 'TO LEARN' ? true : false}
                        />
                        <Form.Check
                            inline
                            label="LEARNING"
                            name="status"
                            type='radio'
                            value='LEARNING'
                            onChange={onChangeModal}
                            defaultChecked={status === 'LEARNING' ? true : false}
                        />
                        <Form.Check
                            inline
                            label="LEARNED"
                            name="status"
                            type='radio'
                            value='LEARNED'
                            onChange={onChangeModal}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
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

export default UpdatePostModal