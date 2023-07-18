import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Tips.scss'

type TipType = 'normal' | 'fail' | 'warning' | '';

interface TipsProps {
    text: string;
    type: TipType;
}

const Tips: React.FC<TipsProps> = ({ text, type }) => {
    let borderColor = 'green';

    switch (type) {
        case 'fail':
            borderColor = 'red';
            break;
        case 'warning':
            borderColor = 'yellow';
            break;
        case 'normal':
        case '':
        default:
            borderColor = '#6CE37C';
    }

    const style = {
        borderLeft: `5px solid ${borderColor}`,
        paddingLeft: '1rem',
    };

    return (
        <div style={style} className="tips-container">
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
};

export default Tips;
