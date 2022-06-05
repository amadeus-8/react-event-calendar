import React from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './CalendarTodayEvents.module.scss'
import { iEvent } from '../../../../interfaces/calendarInterface'
import { timeFromISO, traversCrossingEvents } from '../../../../utils/general'
import { Tooltip } from '../../../../components/common/tooltip/Tooltip'
import { timelineStart, minuteHeight } from '../../../../utils/constants'
import { calendarSelector } from '../../../../redux/slices/calendarConfigSlice'

interface iTodayEvents {
    todayEvents: Array<iEvent>
}

export const CalendarTodayEvents: React.FC<iTodayEvents> = ({
    todayEvents,
}) => {
    const { filterType } = useSelector(calendarSelector)
    const crossingIds: Array<number | string> = []

    return (
        <div>
            {todayEvents.map((event, index) => {
                const eventStart: dayjs.Dayjs = dayjs(
                    timeFromISO(event.start_date),
                    'HH:mm'
                )
                const eventEnd: dayjs.Dayjs = dayjs(
                    timeFromISO(event.finish_date),
                    'HH:mm'
                )
                const top: number =
                    eventStart.diff(timelineStart, 'minute') * minuteHeight
                const height: number =
                    eventEnd.diff(eventStart, 'minute') * minuteHeight

                const crossingEvents: Array<iEvent> = traversCrossingEvents(
                    todayEvents,
                    event
                )

                const alreadyRendered: Array<iEvent> = crossingEvents.filter(
                    (e) =>
                        crossingIds.includes(
                            filterType === 'all' ? e.id : e.event_id
                        )
                )
                crossingIds.push(
                    filterType === 'all' ? event.id : event.event_id
                )

                return (
                    <div
                        key={index}
                        className={clsx(
                            styles.eventItem,
                            styles[event.status_id]
                        )}
                        style={{
                            height,
                            top,
                            width: crossingEvents.length
                                ? `${100 / crossingEvents.length}%`
                                : '',
                            left: alreadyRendered.length
                                ? `${
                                      alreadyRendered.length *
                                      (100 / crossingEvents.length)
                                  }%`
                                : '',
                        }}
                    >
                        <Tooltip text={event.name}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                className={styles.eventDescription}
                                href={filterType === 'my' ? `#` : `#`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {event.name}
                            </a>
                        </Tooltip>
                    </div>
                )
            })}
        </div>
    )
}
