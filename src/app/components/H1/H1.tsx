import React from 'react';

const H1: React.ComponentType<{children: React.ReactNode}> = ({ children }) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/ /g, '-') : '';

    return (
        <h1 id={id}>
            {children}
        </h1>
    );
}

export default H1;