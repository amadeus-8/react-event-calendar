import dayjs from 'dayjs'

type CallbackFunction = (currentMoment: dayjs.Dayjs) => boolean

export const useDateComparison = (type: string): CallbackFunction => {
    switch (type) {
        case 'day':
            return (currentMoment): boolean =>
                dayjs().isSame(currentMoment, 'day')
        case 'weekend':
            return (currentMoment): boolean =>
                currentMoment.day() === 6 || currentMoment.day() === 0
        case 'month':
            return (currentMoment): boolean =>
                !dayjs().isSame(currentMoment, 'month')
        default:
            return () => false
    }
}
