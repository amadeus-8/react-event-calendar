import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { calendarSelector } from '../../../../redux/slices/calendarConfigSlice'
import { CalendarDayView } from '../calendarDayView/CalendarDayView'
import { CalendarWeekView } from '../calendarWeekView/CalendarWeekView'
import { CalendarMonthView } from '../calendarMonthView/CalendarMonthView'

export const CalendarBody: FC = () => {
    const { view } = useSelector(calendarSelector)

    return (
        <>
            {view === 'day' && <CalendarDayView />}
            {view === 'week' && <CalendarWeekView />}
            {view === 'month' && <CalendarMonthView />}
        </>
    )
}
