import { USER_LOGIN, USER_LOGOUT, SAVE_RESET_PASSWORD_TOKEN } from './auth.type'

const initialState = {
  isLoggedIn: false,
  token: null,
  data: null,
  passwordResetToken: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        data: action.payload.data,
        token: action.payload.data.token,
        userRole:
          action.payload.data.userRole === 0 ? 'recruiter' : 'candidate',
      }

    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
        token: null,
        passwordResetToken: null,
      }

    case SAVE_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        passwordResetToken: action.payload,
      }

    default:
      return { ...state }
  }
}

export default auth
