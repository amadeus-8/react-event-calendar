import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

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

export default calendarConfigSlice.reducer
