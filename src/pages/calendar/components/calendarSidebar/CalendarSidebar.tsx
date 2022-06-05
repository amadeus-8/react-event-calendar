import React from 'react'
import MediaQuery from 'react-responsive'

import styles from './CalendarSidebar.module.scss'
import { CalendarDatePicker } from '../calendarDatePicker/CalendarDatePicker'
import { CalendarEventsFilter } from '../calendarEventsFilter/CalendarEventsFilter'
import { CalendarClosestEvents } from '../calendarClosestEvents/CalendarClosestEvents'
import { Collapse } from '../../../../components/common/collapse/Collapse'
import { XL } from '../../../../utils/breakpoints'

export const CalendarSidebar: React.FC = () => {
    return (
        <div className={styles.container}>
            <MediaQuery maxWidth={XL - 1}>
                <Collapse text="Дополнительно">
                    {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
                    <>
                        <CalendarEventsFilter />
                    </>
                </Collapse>
            </MediaQuery>
            <MediaQuery minWidth={XL}>
                <>
                    <CalendarEventsFilter />
                    <CalendarDatePicker />
                    <CalendarClosestEvents />
                </>
            </MediaQuery>
        </div>
    )
}
