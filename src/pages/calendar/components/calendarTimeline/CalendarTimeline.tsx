import React from 'react'
import { useSelector } from 'react-redux'

import styles from './CalendarTimeline.module.scss'
import { calendarSelector } from '../../../../redux/slices/calendarConfigSlice'

export const CalendarTimeline: React.FC = () => {
    const { timeline } = useSelector(calendarSelector)

    return (
        <div className={styles.container}>
            {timeline.map((time, index) => (
                <div className={styles.cell} key={index}>
                    <span className={styles.time}>{time.format('HH:mm')}</span>
                </div>
            ))}
        </div>
    )
}
