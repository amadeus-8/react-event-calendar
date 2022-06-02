import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import badMutable from 'dayjs/plugin/badMutable'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { RootState } from '../reducers/rootReducer'
import { iCalendarDays, iEvent } from '../../interfaces/calendarInterface'
import { calendarAPI } from '../../api/calendarAPI/calendarAPI'
import {
    dateFromISO,
    createCalendarDays,
    createTimeline,
} from '../../utils/general'

// Config for mutable dayjs Object, and russian localization
dayjs.locale(ru)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(badMutable)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Almaty')

type ViewType = 'day' | 'week' | 'month'
type FilterType = 'all' | 'my' | 'open'

export interface iInitialState {
    view: ViewType
    filterType: FilterType
    currentMoment: dayjs.Dayjs
    calendarDays: Array<iCalendarDays>
    datepickerDays: Array<dayjs.Dayjs>
    closestEvents: Array<iEvent>
    weekNames: Array<dayjs.Dayjs>
    timeline: Array<dayjs.Dayjs>
}

const initialState: iInitialState = {
    view: 'month',
    filterType: 'all',
    currentMoment: dayjs(),
    calendarDays: [],
    datepickerDays: [],
    closestEvents: [],
    weekNames: [],
    timeline: createTimeline('07:00:00', 12),
}

const calendarConfigSlice = createSlice({
    name: 'calendarConfig',
    initialState,
    reducers: {
        setCalendarDays: (state, action) => {
            state.calendarDays = action.payload
        },
        setClosestEvents: (state, action) => {
            state.closestEvents = action.payload
        },
        setDatepickerDays: (state, action) => {
            state.datepickerDays = action.payload
        },
        setSwitchCalendar: (state, action) => {
            state.currentMoment = action.payload
        },
        switchCalendarView: (state, action) => {
            state.view = action.payload
        },
        setFilterType: (state, action) => {
            state.filterType = action.payload
        },
        setWeekNames: (state, action) => {
            state.weekNames = action.payload
        },
    },
})

export const {
    setCalendarDays,
    setClosestEvents,
    setDatepickerDays,
    setSwitchCalendar,
    switchCalendarView,
    setFilterType,
    setWeekNames,
} = calendarConfigSlice.actions

export const getCalendarDays = createAsyncThunk<
    void,
    void,
    { state: RootState }
>('calendarConfig/getCalendarDays', async (_, { dispatch, getState }) => {
    // Here type can be month, week or day
    const { currentMoment, filterType, timeline, view } =
        getState().calendarConfig
    const { userInfo } = getState().user

    let startDay: dayjs.Dayjs = dayjs()
    let totalDays = 0
    switch (view) {
        case 'month':
            startDay = currentMoment
                .clone()
                .startOf('month')
                .startOf('week')
                .subtract(1, 'day')
            totalDays = 42
            break
        case 'week':
            startDay = currentMoment.clone().startOf('week').subtract(1, 'day')
            totalDays = 7
            break
        case 'day':
            startDay = currentMoment.clone().startOf('day').subtract(1, 'day')
            totalDays = 2
            break
        default:
            break
    }
    const calendarDays: Array<dayjs.Dayjs> = createCalendarDays(
        startDay,
        totalDays
    )

    const firstDay = 0
    const lastDay: number = calendarDays.length - 1
    const eventsStart: string = calendarDays[firstDay].format('YYYY-MM-DD')
    const eventsEnd: string = calendarDays[lastDay].format('YYYY-MM-DD')

    let events: Array<iEvent> = []
    switch (filterType) {
        case 'all':
            events = await calendarAPI.getEvents(eventsStart, eventsEnd)
            break
        case 'my':
            events = await calendarAPI.getMyEvents(userInfo.id)
            break
        case 'open':
            events = await calendarAPI.getOpenEvents(eventsStart, eventsEnd)
            break
        default:
            break
    }

    const calendarWithEvents: Array<iCalendarDays> = []

    const dayTimeline: Array<dayjs.Dayjs> = timeline

    const datepickerDays: Array<dayjs.Dayjs> = createCalendarDays(
        currentMoment
            .clone()
            .startOf('month')
            .startOf('week')
            .subtract(1, 'day'),
        42
    )
    dispatch(setDatepickerDays(datepickerDays))

    const weekNames: Array<dayjs.Dayjs> = createCalendarDays(
        currentMoment.clone().startOf('week').subtract(1, 'day'),
        7
    )
    dispatch(setWeekNames(weekNames))

    calendarDays.forEach((dayMoment) => {
        dayMoment.format('YYYY-MM-DD')
        const dayEvents: Array<iEvent> = []

        events.forEach((Event: iEvent) => {
            const eventStart: string = dateFromISO(Event.start_date)

            if (dayMoment.isSame(eventStart)) {
                dayEvents.push(Event)
            }
        })

        const momentWithEvents: iCalendarDays = {
            dayMoment,
            dayEvents,
            dayTimeline,
        }

        calendarWithEvents.push(momentWithEvents)
    })

    await dispatch(setCalendarDays(calendarWithEvents))
})

export const switchCalendar = createAsyncThunk<
    void,
    string,
    { state: RootState }
>(
    'calendarConfig/switchCalendar',
    async (direction, { dispatch, getState }) => {
        const { currentMoment, view } = getState().calendarConfig

        let moment: dayjs.Dayjs
        switch (direction) {
            case 'forward':
                moment = currentMoment.clone().add(1, view)
                break
            case 'backward':
                moment = currentMoment.clone().subtract(1, view)
                break
            case 'current':
                moment = dayjs()
                break
            default:
                moment = dayjs()
                break
        }

        dispatch(setSwitchCalendar(moment))
    }
)

export const switchSelectedMoment = createAsyncThunk<
    void,
    dayjs.Dayjs,
    { state: RootState }
>('calendarConfig/switchSelectedMoment', async (moment, { dispatch }) => {
    dispatch(setSwitchCalendar(moment))
    dispatch(switchCalendarView('day'))
})

export const getClosestEvents = createAsyncThunk<
    void,
    void,
    { state: RootState }
>('calendarConfig/getClosestEvents', async (_, { dispatch }) => {
    const weekStart: dayjs.Dayjs = dayjs().add(1, 'day')
    const weekEnd: dayjs.Dayjs = weekStart.clone().add(1, 'week')

    const eventWeekStart: string = weekStart.format('YYYY-MM-DD')
    const eventWeekEnd: string = weekEnd.format('YYYY-MM-DD')

    const closestEvents = await calendarAPI.getEvents(
        eventWeekStart,
        eventWeekEnd
    )

    await dispatch(setClosestEvents(closestEvents))
})

export const calendarSelector = (state: RootState): iInitialState =>
    state.calendarConfig

export default calendarConfigSlice.reducer
