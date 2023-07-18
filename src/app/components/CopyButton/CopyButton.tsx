import React, { useState } from 'react'
import CopyBtn from '../../../styles/img/copy.png'
import Image from 'next/image'
import './CopyButton.scss'

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [popoverText, setPopoverText] = useState('');
    const [showPopover, setShowPopover] = useState(false);
    const [hovering, setHovering] = useState(false);

    const copyText = async () => {
        await navigator.clipboard.writeText(text);
        setPopoverText('Copied!');
        setShowPopover(true);
        setTimeout(() => {
            if (!hovering) { // Only hide if not hovering
                setShowPopover(false);
            }
        }, 2000);
    };

    return (
        <div className="copy-btn-wrapper">
            {showPopover &&
                <div className="popover">
                    {popoverText}
                    <div className="popover-arrow"></div>
                </div>
            }
            <div className="code-block-copy-btn" onClick={copyText}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.26315 2.43244C5.26315 1.08904 6.32355 0 7.63157 0H17.6316C18.9396 0 20 1.08904 20 2.43244V12.7027C20 14.0461 18.9396 15.1351 17.6316 15.1351H7.63157C6.32355 15.1351 5.26315 14.0461 5.26315 12.7027V2.43244ZM7.63157 1.62163C7.19557 1.62163 6.8421 1.98464 6.8421 2.43244V12.7027C6.8421 13.1505 7.19557 13.5135 7.63157 13.5135H17.6316C18.0676 13.5135 18.421 13.1505 18.421 12.7027V2.43244C18.421 1.98464 18.0676 1.62163 17.6316 1.62163H7.63157Z" fill="#61667A"/>
                    <path d="M3.96366 4.86486C3.9529 4.9534 3.94737 5.04361 3.94737 5.13514V6.48648H2.36842C1.93242 6.48648 1.57895 6.8495 1.57895 7.2973V17.5676C1.57895 18.0154 1.93242 18.3784 2.36842 18.3784H12.3684C12.8044 18.3784 13.1579 18.0154 13.1579 17.5676V16.4865H14.7368V17.5676C14.7368 18.911 13.6765 20 12.3684 20H2.36842C1.06037 20 0 18.911 0 17.5676V7.2973C0 5.9539 1.06037 4.86486 2.36842 4.86486H3.96366Z" fill="#61667A"/>
                </svg>
            </div>
        </div>
    );
};

export default CopyButton;
