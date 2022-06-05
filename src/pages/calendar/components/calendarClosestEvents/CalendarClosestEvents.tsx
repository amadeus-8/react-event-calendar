import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import styles from './CalendarClosestEvents.module.scss'
import {
    calendarSelector,
    getClosestEvents,
} from '../../../../redux/slices/calendarConfigSlice'

export const CalendarClosestEvents: React.FC = () => {
    const { closestEvents } = useSelector(calendarSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClosestEvents())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div>
                <h4 className={styles.title}>Ближайшие мероприятия</h4>
            </div>
            <div>
                {closestEvents.length &&
                    closestEvents.map(({ id, start_date, name }, index) => (
                        <div className={styles.closestEvent} key={index}>
                            <div className={styles.eventDate}>
                                <span>
                                    {dayjs(start_date).format('DD MMMM')},{' '}
                                    {dayjs(start_date).format('dddd')}
                                </span>
                                <span>{dayjs(start_date).format('HH:mm')}</span>
                            </div>
                            <div className={styles.eventName}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#" target="_blank" rel="noreferrer">
                                    {name}
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
            {!closestEvents.length && (
                <div className={styles.eventName}>
                    <span>Нет событий</span>
                </div>
            )}
        </div>
    )
}
