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

export const CalendarHeaderMobile: React.FC = () => {
    const { currentMoment, view } = useSelector(calendarSelector)
    const currentYear = currentMoment.clone().format('YYYY')
    const currentMonth = currentMoment.clone().format('MMMM')
    const dispatch = useDispatch()

    return (
        <div>
            <div className={styles.headerSwitchers}>
                <div className={styles.monthName}>
                    <h3 className={styles.headerTitle}>
                        <span>{currentMonth}</span>
                        <span>{currentYear}</span>
                    </h3>
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
            <div>
                <div className={styles.switchGroup}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendar('current'))}
                        onKeyDown={() => dispatch(switchCalendar('current'))}
                        className={styles.viewItem}
                    >
                        <span>сегодня</span>
                    </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendarView('day'))}
                        onKeyDown={() => dispatch(switchCalendarView('day'))}
                        className={clsx(styles.viewItem, {
                            [styles.selectedItem]: view === 'day',
                        })}
                    >
                        <span>день</span>
                    </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendarView('week'))}
                        onKeyDown={() => dispatch(switchCalendarView('week'))}
                        className={clsx(styles.viewItem, {
                            [styles.selectedItem]: view === 'week',
                        })}
                    >
                        <span>неделя</span>
                    </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => dispatch(switchCalendarView('month'))}
                        onKeyDown={() => dispatch(switchCalendarView('month'))}
                        className={clsx(styles.viewItem, {
                            [styles.selectedItem]: view === 'month',
                        })}
                    >
                        <span>месяц</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
