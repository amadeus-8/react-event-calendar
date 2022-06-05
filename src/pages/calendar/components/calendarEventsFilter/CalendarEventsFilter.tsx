import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import styles from './CalendarEventsFilter.module.scss'
import { setFilterType } from '../../../../redux/slices/calendarConfigSlice'
import { Checkbox } from '../../../../components/common/checkbox/Checkbox'

export const CalendarEventsFilter: React.FC = () => {
    // TODO: Need to refactor
    const [checkedState, setCheckedState] = useState<Array<boolean>>(
        new Array(2).fill(false)
    )
    const [disabledState, setDisabledState] = useState<Array<boolean>>(
        new Array(2).fill(false)
    )
    const dispatch = useDispatch()

    const filters = [
        {
            name: 'Мои мепроприятия',
            type: 'my',
        },
        {
            name: 'Открытые мероприятия',
            type: 'open',
        },
    ]

    const handleChange = (position: number, filter: string): void => {
        const updateCheckedState = checkedState.map((itemChecked, index) =>
            index === position ? !itemChecked : itemChecked
        )
        setCheckedState(updateCheckedState)

        const updateDisabledState = [...updateCheckedState].reverse()
        setDisabledState(updateDisabledState)

        switch (filter) {
            case 'my':
                if (!checkedState[position]) dispatch(setFilterType('my'))
                else dispatch(setFilterType('all'))
                break
            case 'open':
                if (!checkedState[position]) dispatch(setFilterType('open'))
                else dispatch(setFilterType('all'))
                break
            default:
                break
        }
    }

    return (
        <div className={styles.container}>
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className={styles.orderTraining}
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                >
                    Создать мероприятие
                </a>
            </div>
            <div>
                <h4 className={styles.title}>Показывать мероприятия</h4>
            </div>
            <div className={styles.filtersContainer}>
                {filters.map(({ name, type }, index) => (
                    <div
                        className={clsx(
                            styles.filterGroup,
                            disabledState[index] && styles.filterDisabled
                        )}
                        key={index}
                    >
                        <label className={styles.filterLabel}>
                            <Checkbox
                                onChange={() => handleChange(index, type)}
                                checked={checkedState[index]}
                                disabled={disabledState[index]}
                            />
                            <span className={styles.filterName}>{name}</span>
                        </label>
                    </div>
                ))}
                {/* <div className={styles.filterGroup}> */}
                {/*    <label className={styles.filterLabel}> */}
                {/*        <Checkbox */}
                {/*            onChange={() => handleChange(1)} */}
                {/*            checked={checkedState[1]} */}
                {/*            disabled={disabledState[1]} */}
                {/*        /> */}
                {/*        <span className={styles.filterName}> */}
                {/*            Открытые мероприятия */}
                {/*        </span> */}
                {/*    </label> */}
                {/* </div> */}
            </div>
        </div>
    )
}
