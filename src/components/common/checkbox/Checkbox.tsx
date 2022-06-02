import React from 'react'
import clsx from 'clsx'

import styles from './Checkbox.module.scss'

interface iCheckbox {
    color?: string
    checked?: boolean
    disabled?: boolean
    onChange: () => void
}

export const Checkbox: React.FC<iCheckbox> = ({
    color = 'main',
    checked,
    disabled,
    onChange,
}) => {
    // TODO: Need to refactor
    return (
        <div className={styles.container}>
            <label className={clsx(styles.inputCheckbox, styles[color])}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <span className={styles.checkbox} />
            </label>
        </div>
    )
}
