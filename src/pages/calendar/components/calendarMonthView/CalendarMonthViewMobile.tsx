import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CalendarMonthView.module.scss'
import { CalendarWeekNames } from '../calendarWeekNames/CalendarWeekNames'
import { useDateComparison } from '../../../../hooks/useDateComparison'
import {
    calendarSelector,
    getCalendarDays,
    switchSelectedMoment,
} from '../../../../redux/slices/calendarConfigSlice'

export const CalendarMonthViewMobile: React.FC = () => {
    const { currentMoment, calendarDays, filterType } =
        useSelector(calendarSelector)
    const isCurrentDay = useDateComparison('day')
    const isCurrentMonth = useDateComparison('month')
    const isWeekend = useDateComparison('weekend')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCalendarDays())
    }, [dispatch, currentMoment, filterType])

    return (
        <>
            <CalendarWeekNames />
            <div className={styles.container}>
                {calendarDays.map(({ dayMoment, dayEvents }, index) => {
                    return (
                        <div
                            className={clsx(styles.cell, {
                                [styles.weekend]: isWeekend(dayMoment),
                                [styles.inactiveDay]: isCurrentMonth(dayMoment),
                            })}
                            tabIndex={0}
                            role="button"
                            onKeyDown={() =>
                                dispatch(switchSelectedMoment(dayMoment))
                            }
                            onClick={() =>
                                dispatch(switchSelectedMoment(dayMoment))
                            }
                            key={index}
                        >
                            <div className={styles.dayRow}>
                                <div className={styles.dayWrapper}>
                                    <span
                                        className={clsx({
                                            [styles.currentDay]:
                                                isCurrentDay(dayMoment),
                                        })}
                                    >
                                        {dayMoment.format('D')}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.events}>
                                {dayEvents.length !== 0 && (
                                    <div className={styles.eventsDot} />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
