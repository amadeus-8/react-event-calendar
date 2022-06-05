import React, { FC } from 'react'
import MediaQuery from 'react-responsive'

import { CalendarWeekViewDesktop } from './CalendarWeekViewDesktop'
import { CalendarWeekViewMobile } from './CalendarWeekViewMobile'
import { LG } from '../../../../utils/breakpoints'

export const CalendarWeekView: FC = () => {
    return (
        <>
            <MediaQuery minWidth={LG}>
                <CalendarWeekViewDesktop />
            </MediaQuery>
            <MediaQuery maxWidth={LG - 1}>
                <CalendarWeekViewMobile />
            </MediaQuery>
        </>
    )
}
