import { axiosInstance } from '../axiosInstance'
import { iEvent } from '../../interfaces/calendarInterface'

export const calendarAPI = {
    async getEvents(
        eventsStart: string,
        eventsEnd: string
    ): Promise<Array<iEvent>> {
        const { data } = await axiosInstance.get(
            `/events?startDate=${eventsStart}&endDate=${eventsEnd}`
        )

        const { events } = data

        return events
    },

    async getMyEvents(userId: string): Promise<Array<iEvent>> {
        const { data } = await axiosInstance.get(`/my_events?userId=${userId}`)
        return data
    },

    async getOpenEvents(
        eventsStart: string,
        eventsEnd: string
    ): Promise<Array<iEvent>> {
        const { data } = await axiosInstance.get(
            `/events?startDate=${eventsStart}&endDate=${eventsEnd}&isOpen=1`
        )

        const { events } = data

        return events
    },
}
