import { createServer } from 'miragejs'

import { events } from './calendarAPI/calendarAPI.mock'

createServer({
    routes() {
        this.namespace = 'api'

        this.get(`/events`, () => {
            return {
                events,
            }
        })
    },
})
