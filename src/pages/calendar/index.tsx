import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import '../../scss/app.scss'
import App from './components/App'
import store from '../../redux/store/store'
import sentryInit from '../../services/sentry'
import '../../api/mirage'

sentryInit()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
