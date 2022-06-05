import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import styles from './CalendarDayView.module.scss'
import { CalendarWeekNames } from '../calendarWeekNames/CalendarWeekNames'
import { CalendarTimeline } from '../calendarTimeline/CalendarTimeline'
import {
    calendarSelector,
    getCalendarDays,
} from '../../../../redux/slices/calendarConfigSlice'
import { CalendarTodayEvents } from '../calendarTodayEvents/CalendarTodayEvents'
import { useDateComparison } from '../../../../hooks/useDateComparison'
import { top, maxHeight } from '../../../../utils/constants'

export const CalendarDayViewDesktop: React.FC = () => {
    const dispatch = useDispatch()
    const { calendarDays, currentMoment } = useSelector(calendarSelector)
    const isWeekend = useDateComparison('weekend')
    const today = 0

    useEffect(() => {
        dispatch(getCalendarDays())
    }, [dispatch, currentMoment])

    return (
        <>
            <div className={styles.weekNamesContainer}>
                <div className={styles.emptyCell} />
                <div className={styles.weekNames}>
                    <CalendarWeekNames />
                </div>
            </div>
            <div className={styles.container}>
                <CalendarTimeline />
                <div className={styles.dayHours}>
                    {calendarDays.length && (
                        <>
                            {calendarDays[today].dayTimeline.map((_, index) => (
                                <div
                                    className={clsx(styles.dayRows, {
                                        [styles.weekend]:
                                            isWeekend(currentMoment),
                                    })}
                                    key={index}
                                >
                                    <span className={styles.divider} />
                                </div>
                            ))}
                            {top < maxHeight && (
                                <span
                                    className={styles.timeNow}
                                    style={{ top }}
                                />
                            )}
                            <CalendarTodayEvents
                                todayEvents={calendarDays[today].dayEvents}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
