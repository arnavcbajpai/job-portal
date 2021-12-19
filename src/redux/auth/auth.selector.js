import { createSelector } from 'reselect'

export const selectAuth = (state) => state.auth

export const checkIfLoggedIn = createSelector(
  [selectAuth],
  (auth) => auth.isLoggedIn
)

export const selectUserDetails = createSelector(
  [selectAuth],
  (auth) => auth.details
)

export const selectPasswordResetToken = createSelector(
  [selectAuth],
  (auth) => auth.passwordResetToken
)
