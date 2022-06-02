import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'

import styles from './Tooltip.module.scss'

interface iTooltip {
    children: ReactNode
    text: string
}

export const Tooltip: React.FC<iTooltip> = ({ children, text }) => {
    const [isTooltipShown, setIsTooltipShown] = useState(false)

    return (
        <div className={styles.container}>
            <div
                className={clsx(styles.tooltipBox, {
                    [styles.visible]: isTooltipShown,
                })}
            >
                {text}
                <span className={styles.tooltipArrow} />
            </div>
            <div
                className={styles.tooltipBody}
                onMouseEnter={() => setIsTooltipShown(true)}
                onMouseLeave={() => setIsTooltipShown(false)}
            >
                {children}
            </div>
        </div>
    )
}
