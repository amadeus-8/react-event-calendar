import React, { ReactNode } from 'react'

interface iContainer {
    children: ReactNode
    fluid?: boolean
}

export const Container: React.FC<iContainer> = ({ children, fluid }) => {
    return (
        <div className={fluid ? 'container-fluid' : 'container'}>
            {children}
        </div>
    )
}
