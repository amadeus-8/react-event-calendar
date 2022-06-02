import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { RootState } from '../reducers/rootReducer'

type ViewType = 'day' | 'week' | 'month'

export interface iInitialState {
    view: ViewType
    currentMoment: dayjs.Dayjs
    calendarDays: Array<any>
}

const initialState: iInitialState = {
    view: 'month',
    currentMoment: dayjs(),
    calendarDays: [],
}

const calendarConfigSlice = createSlice({
    name: 'calendarConfig',
    initialState,
    reducers: {},
})

export const calendarSelector = (state: RootState): iInitialState =>
    state.calendarConfig

export default calendarConfigSlice.reducer
