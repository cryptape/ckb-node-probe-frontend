import React from 'react';

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let id = '';
    if (Array.isArray(children)) {
        let texts = [];
        for (let child of children) {
            if (typeof child === 'string') {
                texts.push(child);
            } else if (child && typeof child === 'object' && 'props' in child && child.props.children) {
                texts.push(child.props.children);
            }
        }
        id = texts.join('').toLowerCase().replace(/ /g, '-').replace(/:/g, '');
    } else if (typeof children === 'string') {
        id = children.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
    }

    return (
        <h1 id={id}>
            {children}
        </h1>
    );
}

export default H1;
