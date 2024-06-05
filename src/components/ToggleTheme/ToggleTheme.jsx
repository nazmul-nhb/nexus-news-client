import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';
import { MdLightMode } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { IoMoon } from 'react-icons/io5';

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(
        theme === 'light'
            ? <IoMoon  className='text-nexus-primary' />
            : <MdLightMode className='text-nexus-secondary' />);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setCurrentIcon(
                theme === 'light'
                    ? <IoMoon  className='text-nexus-primary' />
                    : <MdLightMode className='text--nexus-secondary' />);
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggler  text-2xl md:text-4xl"
        >
            <Tooltip anchorSelect=".theme-toggler" place="bottom" className='!text-sm md:!text-base'>
                {theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
            </Tooltip>
            <span className={`inset-0 flex items-center justify-center ${isAnimating ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                {currentIcon}
            </span>
        </button>
    );
};

export default ToggleTheme;
