import React from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import styles from './CalendarTodayEvents.module.scss'
import { iEvent } from '../../../../interfaces/calendarInterface'

interface iTodayEvents {
    todayMoment: dayjs.Dayjs
    todayEvents: Array<iEvent>
}

export const CalendarTodayEventsMobile: React.FC<iTodayEvents> = ({
    todayMoment,
    todayEvents,
}) => {
    return (
        <>
            <div className={styles.eventMoment}>
                <span className={styles.currentDay}>
                    {todayMoment.format('D MMMM')},
                </span>
                <span className={styles.currentWeekDay}>
                    {todayMoment.format('dddd')}
                </span>
            </div>
            <div>
                {todayEvents.length !== 0 &&
                    todayEvents.map(
                        (
                            { id, name, start_date, finish_date, status_id },
                            index
                        ) => {
                            return (
                                <div
                                    className={clsx(
                                        styles.eventContainer,
                                        styles[status_id]
                                    )}
                                    key={index}
                                >
                                    <div className={styles.event}>
                                        <div
                                            className={clsx(
                                                styles.eventBorder,
                                                styles[status_id]
                                            )}
                                        />
                                        <div>
                                            <div className={styles.eventName}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a
                                                    href="#"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {name}
                                                </a>
                                            </div>
                                            <div className={styles.eventDate}>
                                                <span>
                                                    {dayjs(start_date).format(
                                                        'HH:mm'
                                                    )}
                                                </span>
                                                <span>{' - '}</span>
                                                <span>
                                                    {dayjs(finish_date).format(
                                                        'HH:mm'
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                {todayEvents.length === 0 && (
                    <div>
                        <span className={styles.noEvents}>Нет событий</span>
                    </div>
                )}
            </div>
        </>
    )
}
