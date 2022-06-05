import React, { useState } from 'react'
import MediaQuery from 'react-responsive'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './CalendarMonthEvents.module.scss'
import { iEvent } from '../../../../interfaces/calendarInterface'
import { Icon } from '../../../../components/common/icon/Icon'
import { LG } from '../../../../utils/breakpoints'
import { Tooltip } from '../../../../components/common/tooltip/Tooltip'
import { calendarSelector } from '../../../../redux/slices/calendarConfigSlice'

interface iCalendarEvents {
    events: Array<iEvent>
}

export const CalendarMonthEvents: React.FC<iCalendarEvents> = ({ events }) => {
    const { filterType } = useSelector(calendarSelector)
    const [isAllEventsShown, setIsAllEventsShown] = useState(false)
    const [sliceNumber, setSliceNumber] = useState(1)

    const showAllEvents = (): void => {
        if (isAllEventsShown) {
            setSliceNumber(1)
        } else {
            setSliceNumber(events.length)
        }
        setIsAllEventsShown(!isAllEventsShown)
    }

    return (
        <div className={styles.container}>
            {events
                .slice(0, sliceNumber)
                .map(({ id, name, status_id, event_id }, index) => {
                    return (
                        <div className={styles.eventContainer} key={index}>
                            <div
                                className={clsx(
                                    styles.event,
                                    styles[status_id]
                                )}
                            >
                                <Tooltip text={name}>
                                    {/* <span className={styles.eventDescription}> */}
                                    {/*    {name} */}
                                    {/* </span> */}
                                    {/* <Icon size="sm">schedule</Icon> */}
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        className={styles.eventDescription}
                                        href={filterType === 'my' ? `#` : `#`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {name}
                                    </a>
                                </Tooltip>
                            </div>
                            <MediaQuery minWidth={LG - 1}>
                                {index === 0 && events.length > 1 && (
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className={styles.showMoreBtn}
                                        onClick={showAllEvents}
                                        onKeyDown={showAllEvents}
                                    >
                                        <span
                                            className={clsx(
                                                styles.showMore,
                                                styles[status_id]
                                            )}
                                        >
                                            {!isAllEventsShown && (
                                                <span>
                                                    +{events.length - 1}
                                                </span>
                                            )}
                                            {isAllEventsShown && (
                                                <Icon size="sm" color="dark">
                                                    expand_less
                                                </Icon>
                                            )}
                                        </span>
                                    </div>
                                )}
                            </MediaQuery>
                        </div>
                    )
                })}
        </div>
    )
}
