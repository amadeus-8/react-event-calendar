import { BrowserTracing } from '@sentry/tracing'

import * as Sentry from '@sentry/react'

const sentryInit = (): void => {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    })
}

export default sentryInit
