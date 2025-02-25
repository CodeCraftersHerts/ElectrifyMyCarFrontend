import { useState, useEffect } from "react";

import { navLinks } from './Links';

import { useNavigate } from 'react-router-dom';



const NavLinks = () => {


    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const navigate = useNavigate(); 

  
    const handleLinkClick = (url) => {
        navigate(url);

    };


    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024); 
        };

        checkScreenSize(); 
        window.addEventListener("resize", checkScreenSize); 

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (isLargeScreen) {
        return (
            <nav>
                <ul className="flex justify-between gap-8">
                    {navLinks.map((link, index) => (
                        <li key={index} onClick={() => handleLinkClick(link.url)}>
                            <span className="text-white text-xs sm:text-lg hover:underline cursor-pointer">
                                    {link.text}
                                </span>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    const midPoint = Math.ceil(navLinks.length / 2);
    const topRow = navLinks.slice(0, midPoint);
    const bottomRow = navLinks.slice(midPoint);

    return (
        <nav>
          
            <ul className="flex justify-between gap-8">
                {topRow.map((link, index) => (
                    <li key={index}>
                        <a href={link.url} className="text-white hover:underline">
                            {link.text}
                        </a>
                    </li>
                ))}
            </ul>

            {bottomRow.length > 0 && (
                <ul className="flex justify-center gap-8 mt-4">
                    {bottomRow.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} className="text-white hover:underline">
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default NavLinks;
