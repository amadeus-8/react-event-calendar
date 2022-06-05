import React from 'react'
import MediaQuery from 'react-responsive'

import { CalendarHeaderDesktop } from './CalendarHeaderDesktop'
import { CalendarHeaderMobile } from './CalendarHeaderMobile'
import { LG } from '../../../../utils/breakpoints'

export const CalendarHeader: React.FC = () => {
    return (
        <>
            <MediaQuery minWidth={LG}>
                <CalendarHeaderDesktop />
            </MediaQuery>
            <MediaQuery maxWidth={LG - 1}>
                <CalendarHeaderMobile />
            </MediaQuery>
        </>
    )
}
