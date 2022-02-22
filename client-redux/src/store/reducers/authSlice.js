import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const loginUsers = createAsyncThunk('auths/login', async(loginForm) => {
    try {
        const res = await axios.post(`${apiUrl}auth/login`)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accesToken)
        return res.data
    } catch (error) {
        if (error.res.data) return error.res.data
        else return {sucess: false, message: error.message}
    }
})

const authSlice = createSlice({
    name: 'auths',
    initialState: {
        onLoading: true,
        isAuthenticated: false,
        user: null,
        resObj: 'ahi'
    },
    reducers: {
        fetchLoginUsers(state, action) {
            state.isAuthenticated = false
        }
    }
})

export const loginUser = loginForm => async dispatch => {
    try {
        const res = await axios.post(`${apiUrl}auth/login`)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accesToken)
        dispatch(fetchLoginUsers(res.data))
    } catch (error) {
        console.log(error.message)
    }
}

const authReducer = authSlice.reducer

export const authSelector = state => state.authReducer

export const {fetchLoginUsers} = authSlice.actions

export default authReducer