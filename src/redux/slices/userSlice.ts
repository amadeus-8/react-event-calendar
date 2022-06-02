import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../reducers/rootReducer'
import { userAPI } from '../../api/userAPI/userAPI'
import { iUserInfo } from '../../interfaces/userInterface'

interface iInitialState {
    userInfo: iUserInfo | Record<string, never>
}

const initialState: iInitialState = {
    userInfo: {},
}

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
    return userAPI.getUserInfo()
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            userSlice.caseReducers.setUserInfo(state, action)
        })
    },
})

export const userSelector = (state: RootState): iInitialState => state.user

export default userSlice.reducer
