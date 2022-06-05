import React from 'react'
import MediaQuery from 'react-responsive'

import { CalendarMonthViewDesktop } from './CalendarMonthViewDesktop'
import { CalendarMonthViewMobile } from './CalendarMonthViewMobile'
import { LG } from '../../../../utils/breakpoints'

export const CalendarMonthView: React.FC = () => {
    return (
        <>
            <MediaQuery minWidth={LG}>
                <CalendarMonthViewDesktop />
            </MediaQuery>
            <MediaQuery maxWidth={LG - 1}>
                <CalendarMonthViewMobile />
            </MediaQuery>
        </>
    )
}
