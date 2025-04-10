import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navLinks } from './Links';

const MobileNavLinks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsVisible(prev => !prev);
  };

  const handleLinkClick = (url) => {
    navigate(url);
    setIsVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest('.menu') &&
        !event.target.closest('.menu-button')
      ) {
        setIsVisible(false);
      }
    };

    const handleResize = () => setIsVisible(false);
    const handleScroll = () => setIsVisible(false);

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
      <button
        onClick={toggleMenu}
        className="menu-button cursor-pointer fill-current text-white hover:text-standardTertiary"
      >
        <svg width="35" height="35" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
          <g id="Frame 1" clipPath="url(#clip0_1_3)">
            <g id="BarGroup">
              <g id="BottomBar">
                <rect y="4" width="5" height="1" rx="0.5" />
              </g>
              <g id="MidBar">
                <rect y="2" width="5" height="1" rx="0.5" />
              </g>
              <g id="TopBar">
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
        <div className="menu absolute top-full left-0 w-full bg-slate-900 shadow-md z-50 py-4">
          <ul className="grid grid-cols-2 gap-4 w-11/12 mx-auto text-left text-lg">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <li
                  key={index}
                  onClick={() => handleLinkClick(link.url)}
                  className="flex items-center gap-2 cursor-pointer hover:underline"
                >
                  {Icon && <Icon className="text-white" />}
                  <span className="text-white text-xs sm:text-lg">
                    {link.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNavLinks;
