import React from 'react'
import MediaQuery from 'react-responsive'

import { CalendarDayViewDesktop } from './CalendarDayViewDesktop'
import { CalendarDayViewMobile } from './CalendarDayViewMobile'
import { LG } from '../../../../utils/breakpoints'

export const CalendarDayView: React.FC = () => {
    return (
        <>
            <MediaQuery minWidth={LG}>
                <CalendarDayViewDesktop />
            </MediaQuery>
            <MediaQuery maxWidth={LG - 1}>
                <CalendarDayViewMobile />
            </MediaQuery>
        </>
    )
}
