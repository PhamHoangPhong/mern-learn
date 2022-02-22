import React, { useContext } from 'react'
import { BsFillCaretRightSquareFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import { PostContext } from '../../contexts/PostContex';

const ActionButtons = ({url, _id}) => {
    const {deletePost, findPost, setShowEditPostModal} = useContext(PostContext)
    const onEditPost = () => {
        findPost(_id)
        setShowEditPostModal(true)
    }
  return (
    <div className='action-buttons'>
        <Button variant='danger' className='mr-5' href={url} target='_blank'>
            <BsFillCaretRightSquareFill />
        </Button>
        <Button variant='success' className='mr-5 post-button' onClick={() => onEditPost()}>
            <BsPencilSquare />
        </Button>
        <Button variant='dark post-button' onClick={() => deletePost(_id)}>
            <BsFillTrashFill />
        </Button>
    </div>
  )
}

export default ActionButtons