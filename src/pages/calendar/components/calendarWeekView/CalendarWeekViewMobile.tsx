import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CalendarWeekView.module.scss'
import {
    calendarSelector,
    getCalendarDays,
} from '../../../../redux/slices/calendarConfigSlice'
import { CalendarTodayEventsMobile } from '../calendarTodayEvents/CalendarTodayEventsMobile'

export const CalendarWeekViewMobile: React.FC = () => {
    const { calendarDays, currentMoment } = useSelector(calendarSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCalendarDays())
    }, [dispatch, currentMoment])

    return (
        <div>
            {calendarDays.map(({ dayMoment, dayEvents }, index) => (
                <div className={styles.weekContainer} key={index}>
                    <CalendarTodayEventsMobile
                        todayMoment={dayMoment}
                        todayEvents={dayEvents}
                    />
                </div>
            ))}
        </div>
    )
}
