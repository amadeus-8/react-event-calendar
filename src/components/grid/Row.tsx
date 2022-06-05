import React, { ReactNode } from 'react'

interface iRow {
    children: ReactNode
    height?: string
}

export const Row: React.FC<iRow> = ({ children, height = 'h-100' }) => {
    return <div className={`row ${height}`}>{children}</div>
}
