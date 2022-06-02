import React, { FC } from 'react'

import styles from './CalendarContainer.module.scss'

import { CalendarHeader } from '../calendarHeader/CalendarHeader'
import { CalendarBody } from '../calendarBody/CalendarBody'

export const CalendarContainer: FC = () => {
    return (
        <div className={styles.container}>
            <CalendarHeader />
            <CalendarBody />
        </div>
    )
}
