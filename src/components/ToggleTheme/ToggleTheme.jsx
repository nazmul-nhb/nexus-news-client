import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';
import { MdLightMode } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { BsFillCloudMoonFill } from 'react-icons/bs';

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(
        theme === 'light'
            ? <BsFillCloudMoonFill className='text-furry' />
            : <MdLightMode className='text-white' />);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setCurrentIcon(
                theme === 'light'
                    ? <BsFillCloudMoonFill className='text-furry' />
                    : <MdLightMode className='text-white' />);
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggler text-white text-2xl md:text-4xl"
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
