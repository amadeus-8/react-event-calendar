import { combineReducers } from '@reduxjs/toolkit'
import calendarConfig from '../slices/calendarConfigSlice'
import user from '../slices/userSlice'

const rootReducer = combineReducers({ calendarConfig, user })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
