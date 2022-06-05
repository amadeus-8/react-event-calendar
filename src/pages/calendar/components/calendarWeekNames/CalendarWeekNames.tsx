import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import styles from './CalendarWeekNames.module.scss'
import { calendarSelector } from '../../../../redux/slices/calendarConfigSlice'
import { useDateComparison } from '../../../../hooks/useDateComparison'

export const CalendarWeekNames: React.FC = () => {
    const { weekNames, currentMoment, view } = useSelector(calendarSelector)
    const isCurrentDay = useDateComparison('day')
    const isWeekend = useDateComparison('weekend')

    return (
        <div
            className={clsx({
                [styles.monthContainer]: view === 'month',
                [styles.weekContainer]: view === 'week',
                [styles.dayContainer]: view === 'day',
            })}
        >
            {view !== 'day' &&
                weekNames.map((weekName, index) => (
                    <div className={styles.cell} key={index}>
                        {view === 'month' && (
                            <span>{weekName.format('dd')}</span>
                        )}
                        {view === 'week' && (
                            <div>
                                <div className={styles.weekName}>
                                    <span>{weekName.format('dd')}</span>
                                </div>
                                <div
                                    className={clsx(styles.weekDay, {
                                        [styles.weekend]: isWeekend(weekName),
                                    })}
                                >
                                    <span
                                        className={clsx({
                                            [styles.currentDay]:
                                                isCurrentDay(weekName),
                                        })}
                                    >
                                        {weekName.format('DD')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            {view === 'day' && (
                <span>{currentMoment.format('DD MMMM, dddd')}</span>
            )}
        </div>
    )
}
