import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CalendarDatePicker.module.scss'
import { Button } from '../../../../components/common/button/Button'
import { Icon } from '../../../../components/common/icon/Icon'
import { useDateComparison } from '../../../../hooks/useDateComparison'
import {
    calendarSelector,
    switchCalendar,
    switchSelectedMoment,
} from '../../../../redux/slices/calendarConfigSlice'

export const CalendarDatePicker: React.FC = () => {
    const { currentMoment, weekNames, datepickerDays } =
        useSelector(calendarSelector)
    const currentYear = currentMoment.clone().format('YYYY')
    const currentMonth = currentMoment.clone().format('MMMM')
    const isCurrentDay = useDateComparison('day')
    const isCurrentMonth = useDateComparison('month')
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.monthName}>
                    <h4 className={styles.headerTitle}>
                        <span>{currentMonth}</span>
                        <span>{currentYear}</span>
                    </h4>
                </div>
                <div className={styles.btnGroup}>
                    <Button
                        color="transparent"
                        onClick={() => dispatch(switchCalendar('backward'))}
                    >
                        <Icon size="md" color="black">
                            chevron_left
                        </Icon>
                    </Button>
                    <Button
                        color="transparent"
                        onClick={() => dispatch(switchCalendar('forward'))}
                    >
                        <Icon size="md" color="black">
                            chevron_right
                        </Icon>
                    </Button>
                </div>
            </div>
            <div className={styles.weekNames}>
                {weekNames.map((weekName, index) => (
                    <div className={styles.weekNameCell} key={index}>
                        <span>{weekName.format('dd')}</span>
                    </div>
                ))}
            </div>
            <div className={styles.datePickerBody}>
                {datepickerDays.map((dayMoment, index) => (
                    <div
                        className={clsx(styles.cell, {
                            [styles.currentDay]: isCurrentDay(dayMoment),
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
                        <span>{dayMoment.format('D')}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
