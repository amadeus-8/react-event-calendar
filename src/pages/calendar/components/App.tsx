import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './App.module.scss'
import { Container, Row } from '../../../components/grid'
import { CalendarContainer } from './calendarContainer/CalendarContainer'
import { CalendarSidebar } from './calendarSidebar/CalendarSidebar'
import { getUserInfo } from '../../../redux/slices/userSlice'

// eslint-disable-next-line react/function-component-definition
export default function App(): JSX.Element {
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(getUserInfo())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <Container>
                <Row>
                    <div className={styles.cols}>
                        <div className={styles.leftSide}>
                            <CalendarSidebar />
                        </div>
                        <div className={styles.rightSide}>
                            <CalendarContainer />
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
