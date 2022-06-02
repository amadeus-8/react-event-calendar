import React, { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './Icon.module.scss'

interface iIcon {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    type?: 'outlined' | 'filled' | 'rounded' | 'sharp' | 'two-tone'
    children: ReactNode
    color?: string
}

interface IconSizes {
    sm: number
    md: number
    lg: number
    xl: number
}

// const iconSizes: IconSizes = {
//     sm: 18,
//     md: 24,
//     lg: 36,
//     xl: 48,
// }

const iconSizes: IconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
}

export const Icon: React.FC<iIcon> = ({
    size = 'md',
    type = 'filled',
    children,
    color = 'dark',
}) => {
    return (
        <span
            className={clsx(
                'icon',
                `md-${iconSizes[size]}`,
                type === 'filled' ? 'material-icons' : `material-icons-${type}`,
                styles[color]
            )}
        >
            {children}
        </span>
    )
}
