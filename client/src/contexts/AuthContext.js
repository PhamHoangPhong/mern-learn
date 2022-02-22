import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from '../reducers/authReducer'
import axios from 'axios'
import { apiUrl } from './constant'
import { LOCAL_STORAGE_TOKEN_NAME } from './constant'
import setAuthToken from '../ultils/setAuthToken'
export const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null
  })

  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME])
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    try {
      const response = await axios.get(`${apiUrl}/auth`)
      if (response.data.success)
        dispatch({type: 'SET AUTH', payload: {isAuthenticated: true, user: response.data.user}})
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)
      dispatch({type: 'SET AUTH', payload: {isAuthenticated: false, user: null}})
    }
  }

  useEffect(() => loadUser(), [])

  const loginUser = async loginForm => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm)
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
        loadUser()
      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      else return {success: false, message: error.message}
    }
  }

  const registerUser = async registerForm => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, registerForm)
      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      else return {success: false, message: error.message}
    }
  }

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    setAuthToken(null)
    dispatch({type: 'SET AUTH', payload: {isAuthenticated: false, user: null}})

  }

  const authContextData = {
    loginUser,
    authState,
    registerUser,
    logoutUser
  }

  return (
      <AuthContext.Provider value={authContextData}>
          {children}
      </AuthContext.Provider>
  )
}

export default AuthContextProvider