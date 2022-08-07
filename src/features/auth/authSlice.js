import { createSlice } from "@reduxjs/toolkit";
import cookie from 'js-cookie'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthorized: false
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, jwt } = action.payload
            state.user = user
            state.isAuthorized = true
            cookie.set('jwt', jwt)
        },
        logOut: (state, action) => {
            state.user = null
            state.isAuthorized = false
            cookie.remove('jwt')
        },
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload
        }
    }
})

export const { setCredentials, logOut, setIsAuthorized } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user

export const isAuthorized = (state) => state.auth.isAuthorized || cookie.get('jwt')