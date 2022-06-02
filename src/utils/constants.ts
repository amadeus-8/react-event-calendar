import dayjs from 'dayjs'

// 80px height of block divided by 60min
export const minuteHeight = 80 / 60
export const timeNow: dayjs.Dayjs = dayjs()

export const timelineStart: dayjs.Dayjs = dayjs('8:00', 'HH:mm')
export const timelineEnd: dayjs.Dayjs = dayjs('20:00', 'HH:mm')

export const top: number = timeNow.diff(timelineStart, 'minute') * minuteHeight
export const maxHeight: number =
    timelineEnd.diff(timelineStart, 'minute') * minuteHeight
