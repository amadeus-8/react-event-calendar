import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../calendarTodayEvents/CalendarTodayEvents.module.scss'
import {
    calendarSelector,
    getCalendarDays,
} from '../../../../redux/slices/calendarConfigSlice'
import { CalendarTodayEventsMobile } from '../calendarTodayEvents/CalendarTodayEventsMobile'
import NoEventsImage from '../../../../assets/images/no-events.svg'
import PlanEventImage from '../../../../assets/images/plan-event.svg'

export const CalendarDayViewMobile: React.FC = () => {
    const { currentMoment, calendarDays, view } = useSelector(calendarSelector)
    const dispatch = useDispatch()
    const today = 0

    useEffect(() => {
        dispatch(getCalendarDays())
    }, [dispatch, currentMoment])

    return (
        <>
            <div className={styles.eventsContainer}>
                {calendarDays.length && (
                    <div>
                        <CalendarTodayEventsMobile
                            todayMoment={calendarDays[today].dayMoment}
                            todayEvents={calendarDays[today].dayEvents}
                        />
                    </div>
                )}
            </div>
            {calendarDays.length && view === 'day' && (
                <div className={styles.imageContainer}>
                    {!calendarDays[today].dayEvents.length && (
                        <img
                            src={NoEventsImage}
                            alt="nope"
                            className={styles.noEventsImage}
                        />
                    )}
                    {calendarDays[today].dayEvents.length !== 0 &&
                        calendarDays[today].dayEvents.length < 3 && (
                            <img
                                src={PlanEventImage}
                                alt="plan"
                                className={styles.noEventsImage}
                            />
                        )}
                </div>
            )}
        </>
    )
}
