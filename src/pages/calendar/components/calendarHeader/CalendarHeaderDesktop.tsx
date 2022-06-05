import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CalendarHeader.module.scss'
import { Button } from '../../../../components/common/button/Button'
import { Icon } from '../../../../components/common/icon/Icon'
import {
    calendarSelector,
    switchCalendar,
    switchCalendarView,
} from '../../../../redux/slices/calendarConfigSlice'

export const CalendarHeaderDesktop: React.FC = () => {
    const { currentMoment, view } = useSelector(calendarSelector)
    const currentYear = currentMoment.clone().format('YYYY')
    const currentMonth = currentMoment.clone().format('MMMM')
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <div className={styles.monthName}>
                <h2 className={styles.headerTitle}>
                    <span>{currentMonth}</span>
                    <span>{currentYear}</span>
                </h2>
            </div>
            <div className={styles.headerSwitchers}>
                <div className={styles.todaySwitcher}>
                    <Button
                        type="outlined"
                        color="white"
                        onClick={() => dispatch(switchCalendar('current'))}
                    >
                        Сегодня
                    </Button>
                </div>
                <div className={styles.viewTypes}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendarView('day'))}
                        onKeyDown={() => dispatch(switchCalendarView('day'))}
                        className={clsx(styles.viewTypeItem, {
                            [styles.active]: view === 'day',
                        })}
                    >
                        <span>день</span>
                    </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendarView('week'))}
                        onKeyDown={() => dispatch(switchCalendarView('week'))}
                        className={clsx(styles.viewTypeItem, {
                            [styles.active]: view === 'week',
                        })}
                    >
                        <span>неделя</span>
                    </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendarView('month'))}
                        onKeyDown={() => dispatch(switchCalendarView('month'))}
                        className={clsx(styles.viewTypeItem, {
                            [styles.active]: view === 'month',
                        })}
                    >
                        <span>месяц</span>
                    </div>
                </div>
                <div className={styles.btnGroup}>
                    <Button
                        color="transparent"
                        onClick={() => dispatch(switchCalendar('backward'))}
                    >
                        <Icon color="black" size="lg">
                            chevron_left
                        </Icon>
                    </Button>
                    <Button
                        color="transparent"
                        onClick={() => dispatch(switchCalendar('forward'))}
                    >
                        <Icon color="black" size="lg">
                            chevron_right
                        </Icon>
                    </Button>
                </div>
            </div>
        </div>
    )
}
