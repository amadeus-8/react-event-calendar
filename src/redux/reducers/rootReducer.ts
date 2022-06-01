import { combineReducers } from '@reduxjs/toolkit'
import calendarConfig from '../slices/calendarConfigSlice'

const rootReducer = combineReducers({ calendarConfig })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
