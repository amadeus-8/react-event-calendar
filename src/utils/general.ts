import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { iEvent } from '../interfaces/calendarInterface'

dayjs.extend(isBetween)

export const dateFromISO = (isoDate: string): string => {
    return isoDate.split('T')[0]
}

export const timeFromISO = (isoDate: string): string => {
    const splitTime = isoDate !== null ? isoDate.split('T')[1] : ''
    return splitTime.split('+')[0]
}

export const createTimeline = (
    startTime: string,
    totalHours: number
): Array<dayjs.Dayjs> => {
    const start = dayjs(startTime, 'HH:mm')
    return [...Array(totalHours)].map(() => start.add(1, 'hour').clone())
}

export const createCalendarDays = (
    startDay: dayjs.Dayjs,
    totalDays: number
): Array<dayjs.Dayjs> => {
    return [...Array(totalDays)].map(() => startDay.add(1, 'day').clone())
}

export const isBetweenInterval = (
    time: string,
    intervalStart: string,
    intervalEnd: string,
    type: 'add' | 'subtract'
): boolean => {
    const Time = dayjs(timeFromISO(time), 'HH:mm')
    const IntervalStart = dayjs(timeFromISO(intervalStart), 'HH:mm')
    const IntervalEnd = dayjs(timeFromISO(intervalEnd), 'HH:mm')

    const timeClone =
        type === 'add'
            ? Time.clone().add(1, 'minute')
            : Time.clone().subtract(1, 'minute')

    return timeClone.isBetween(IntervalStart, IntervalEnd, 'minute')
}

export const traversCrossingEvents = (
    todayEvents: Array<iEvent>,
    event: iEvent
): Array<iEvent> => {
    return todayEvents.filter(
        (e) =>
            (e.id !== event.id &&
                isBetweenInterval(
                    event.start_date,
                    e.start_date,
                    e.finish_date,
                    'add'
                )) ||
            isBetweenInterval(
                event.finish_date,
                e.start_date,
                e.finish_date,
                'subtract'
            ) ||
            isBetweenInterval(
                e.start_date,
                event.start_date,
                event.finish_date,
                'add'
            ) ||
            isBetweenInterval(
                e.finish_date,
                event.start_date,
                event.finish_date,
                'subtract'
            )
    )
}
