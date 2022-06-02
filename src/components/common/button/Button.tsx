import React, { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './Button.module.scss'

interface iButton {
    color?: string
    type?: string
    buttonType?: 'button' | 'submit'
    disabled?: boolean
    children: ReactNode
    onClick?: () => void
}

export const Button: React.FC<iButton> = ({
    color = 'main',
    type = 'contained',
    buttonType = 'button',
    disabled = false,
    children,
    onClick,
}) => {
    return (
        <button
            type={buttonType}
            className={clsx(styles.container, styles[color], styles[type], {
                [styles.disabled]: disabled,
            })}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
