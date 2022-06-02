import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import badMutable from 'dayjs/plugin/badMutable'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { RootState } from '../reducers/rootReducer'

// Config for mutable dayjs Object, and russian localization
dayjs.locale(ru)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(badMutable)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Almaty')

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
