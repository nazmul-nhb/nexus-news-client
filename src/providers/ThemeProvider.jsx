import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('nexus-theme') || 'light');

    useEffect(() => {
        localStorage.setItem('nexus-theme', theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('bg-[#031120fc]', 'text-[#fff]');
            document.documentElement.classList.remove('bg-transparent', 'text-nexus-secondary');
        } else {
            document.documentElement.classList.remove('bg-[#031120fc]', 'text-[#fff]');
            document.documentElement.classList.add('bg-transparent', 'text-nexus-secondary');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node
}

export default ThemeProvider;
