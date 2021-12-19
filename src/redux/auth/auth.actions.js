import * as actionType from './auth.type'

export const handleUserLogin = (value) => {
  return {
    type: actionType.USER_LOGIN,
    payload: value,
  }
}

export const handleUserLogout = () => {
  return {
    type: actionType.USER_LOGOUT,
  }
}

export const handlePasswordResetToken = (value) => {
  return {
    type: actionType.SAVE_RESET_PASSWORD_TOKEN,
    payload: value,
  }
}
