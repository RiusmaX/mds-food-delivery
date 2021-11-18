import { createContext, useContext, useReducer } from 'react'
import { login } from '../services/api'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN',
  ERROR: 'ERROR'
}

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...initialState, token: action.data.token, user: action.data.user
      }
    case actionTypes.ERROR:
      return {
        ...initialState, error: action.data.error
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside a AuthProvider')
  return context
}

const loginUser = async (credentials, dispatch) => {
  const response = await login(credentials)
  if (response.error) {
    dispatch({
      type: actionTypes.ERROR,
      data: { error: response.error }
    })
  } else {
    dispatch({
      type: actionTypes.LOGIN,
      data: { user: response.data.user, token: response.data.token }
    })
  }
}

export {
  useAuth,
  AuthProvider,
  actionTypes,
  loginUser
}
