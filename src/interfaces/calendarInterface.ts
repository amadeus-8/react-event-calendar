import dayjs from 'dayjs'

export interface iEvent {
    id: string
    event_type_id: string
    status_id: string
    is_model: boolean
    is_open: boolean
    is_public: boolean
    name: string
    start_date: string
    finish_date: string
    modification_date: string
    event_id: string
}

export interface iCalendarDays {
    dayMoment: dayjs.Dayjs
    dayEvents: Array<iEvent>
    dayTimeline: Array<dayjs.Dayjs>
}
