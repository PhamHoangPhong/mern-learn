import { createContext, useReducer, useState } from "react";
import { postReduer } from "../reducers/postReducer";
import { apiUrl } from "./constant";
import axios from "axios";

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    const [postState, dispatch] = useReducer(postReduer, {
        postFinded: null,
        post: [],
        postLoading: true
    })
    const [showPostModal, setShowPostModal] = useState(false)
    const [showEditPostModal, setShowEditPostModal] = useState(false)
    const [toast, setToast] = useState({
        show: false,
        message: ''
    })

    const handleCloseModal = () => {
        setShowPostModal(false)
    }
    const handleShowModal = () => setShowPostModal(true)

    //get post
    const getPosts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success)
                dispatch({
                    type: 'GET_POSTS',
                    payload: response.data.post
                })
        } catch (error) {
            dispatch({
                type: 'POST_LOADED_FAIL'
            })
        }
    }

    //add post 
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success)
                dispatch({
                    type: 'ADD_POST',
                    payload: response.data.post
                })
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //delte post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success)
                dispatch({
                    type: 'DELETE_POST',
                    payload: postId
                })
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
            if (response.data.success)
                dispatch({
                    type: 'UPDATE_POST',
                    payload: response.data.post
                })
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //find post
    const findPost = postId => {
        const post = postState.post.find(post => post._id === postId)
        dispatch({
            type: 'FIND_POST',
            payload: post
        })
    }
    const postContextData = {
        postState,
        getPosts,
        showPostModal,
        handleCloseModal,
        handleShowModal,
        addPost,
        deletePost,
        toast,
        setToast,
        updatePost,
        findPost,
        showEditPostModal,
        setShowEditPostModal
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider