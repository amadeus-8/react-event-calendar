import React from 'react'
import clsx from 'clsx'

import styles from './Preloader.module.scss'

interface iPreloader {
    color?: 'primary' | 'dark'
    size?: 'small' | 'large'
}

export const Preloader: React.FC<iPreloader> = ({
    color = 'primary',
    size = 'small',
}) => {
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.fixed]: size === 'large',
            })}
        >
            <div className={clsx(styles.loader, styles[size], styles[color])} />
        </div>
    )
}
