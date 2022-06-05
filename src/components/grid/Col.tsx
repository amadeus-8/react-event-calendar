import React, { ReactNode, useMemo } from 'react'

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface iCol {
    children: ReactNode
    xs?: Cols
    sm?: Cols
    md?: Cols
    lg?: Cols
    xl?: Cols
    xxl?: Cols
}

const classCreator = (array: (Cols | number)[]): string => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

    return array
        .map((cols, index) => (cols ? `col-${sizes[index]}-${cols}` : ''))
        .join(' ')
}

export const Col: React.FC<iCol> = React.memo(
    ({ children, xs = 12, sm = 0, md = 0, lg = 0, xl = 0, xxl = 0 }) => {
        const classes = useMemo(
            () => classCreator([xs, sm, md, lg, xl, xxl]),
            [xs, sm, md, lg, xl, xxl]
        )

        return <div className={classes}>{children}</div>
    }
)
