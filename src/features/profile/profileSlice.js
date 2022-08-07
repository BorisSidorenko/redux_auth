import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userProfile: null
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
        clearUserProfile: (state, action) => {
            state.userProfile = null            
        }
    }
})

export const { setUserProfile, clearUserProfile } = profileSlice.actions

export default profileSlice.reducer

export const selectUserProfile = (state) => state.profile.userProfile