import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'

import styles from './Collapse.module.scss'
import { Icon } from '../icon/Icon'

interface iCollapse {
    text: string
    children: ReactNode
}

export const Collapse: React.FC<iCollapse> = ({ text, children }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleExpand = (): void => {
        setIsExpanded(!isExpanded)
    }

    return (
        <>
            <div className={styles.collapseBtnContainer}>
                <button
                    type="button"
                    className={styles.collapseBtn}
                    onClick={handleExpand}
                >
                    {text}
                    <Icon color="dark" size="lg">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                    </Icon>
                </button>
            </div>
            <div
                className={clsx(styles.container, {
                    [styles.expanded]: isExpanded,
                })}
            >
                {children}
            </div>
        </>
    )
}
