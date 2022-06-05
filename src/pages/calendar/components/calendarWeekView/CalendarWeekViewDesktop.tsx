import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CalendarWeekView.module.scss'
import {
    calendarSelector,
    getCalendarDays,
} from '../../../../redux/slices/calendarConfigSlice'
import { CalendarTodayEvents } from '../calendarTodayEvents/CalendarTodayEvents'
import { useDateComparison } from '../../../../hooks/useDateComparison'
import { CalendarWeekNames } from '../calendarWeekNames/CalendarWeekNames'
import { CalendarTimeline } from '../calendarTimeline/CalendarTimeline'
import { top, maxHeight } from '../../../../utils/constants'

export const CalendarWeekViewDesktop: React.FC = () => {
    const { calendarDays, currentMoment } = useSelector(calendarSelector)
    const isCurrentDay = useDateComparison('day')
    const isWeekend = useDateComparison('weekend')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCalendarDays())
    }, [dispatch, currentMoment])

    return (
        <>
            <div className={styles.weekNamesContainer}>
                <div className={styles.emptyCell} />
                <div>
                    <CalendarWeekNames />
                </div>
            </div>
            <div className={styles.container}>
                <CalendarTimeline />
                <div className={styles.weekDays}>
                    {calendarDays.map(
                        ({ dayMoment, dayTimeline, dayEvents }, colIndex) => (
                            <div className={styles.weekColumns} key={colIndex}>
                                {dayTimeline.map((times, rowIndex) => (
                                    <div
                                        className={clsx(styles.weekRows, {
                                            [styles.weekend]:
                                                isWeekend(dayMoment),
                                        })}
                                        key={rowIndex}
                                    >
                                        <span className={styles.divider} />
                                    </div>
                                ))}
                                {top < maxHeight && (
                                    <span
                                        className={clsx(styles.timeNowDashed, {
                                            [styles.timeNow]:
                                                isCurrentDay(dayMoment),
                                        })}
                                        style={{ top }}
                                    />
                                )}
                                <CalendarTodayEvents todayEvents={dayEvents} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}
