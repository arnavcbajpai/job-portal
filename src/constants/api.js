const { REACT_APP_BASE_URL } = process.env

// auth APIs
export const registerAPI = `${REACT_APP_BASE_URL}/auth/register`
export const loginAPI = `${REACT_APP_BASE_URL}/auth/login`
export const resetPasswordTokenAPI = `${REACT_APP_BASE_URL}/auth/resetpassword`

// job API
export const jobAPI = `${REACT_APP_BASE_URL}/jobs/`

// candidate API
export const candidateAPI = `${REACT_APP_BASE_URL}/candidates/jobs/`

//recruiter API
export const recruiterAPI = `${REACT_APP_BASE_URL}/recruiters/jobs`
