import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navLinks } from './Links';

const MobileNavLinks = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate(); 
    const toggleMenu = () => {
        setIsVisible(prevState => {
            const newState = !prevState;
            
            return newState;
        });
    };

    const handleLinkClick = (url) => {
        navigate(url);
        setIsVisible(false); 
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.menu') && !event.target.closest('button')) {
                setIsVisible(false);
            }
        };

        const handleResize = () => {
            setIsVisible(false);
        };

        const handleScroll = () => {
            setIsVisible(false);
        };

        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <button onClick={toggleMenu} className="cursor-pointer fill-current text-white hover:text-yellow-300">
                <svg width="35" height="35" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame 1" clipPath="url(#clip0_1_3)">
                        <g id="BarGroup">
                            <g id="BottomBar">
                                <rect y="4" width="5" height="1" rx="0.5" />
                                <rect y="4" width="5" height="1" rx="0.5" />
                            </g>
                            <g id="MidBar">
                                <rect y="2" width="5" height="1" rx="0.5" />
                                <rect y="2" width="5" height="1" rx="0.5" />
                            </g>
                            <g id="TopBar">
                                <rect width="5" height="1" rx="0.5" />
                                <rect width="5" height="1" rx="0.5" />
                            </g>
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_3">
                            <rect width="35" height="35" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>

            {isVisible && (
                <div className="absolute top-full bg-standardBlue1 left-0 w-full shadow-md z-50">
                    <ul className="flex flex-col align-middle justify-center items-center gap-1">
                        {navLinks.map((link, index) => (
                            <li key={index} onClick={() => handleLinkClick(link.url)}>
                                <span className="text-white text-xs sm:text-lg hover:underline cursor-pointer">
                                    {link.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default MobileNavLinks;
