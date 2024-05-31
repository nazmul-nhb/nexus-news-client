import { useState, useEffect } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

const ScrollButtons = () => {
    const [showTopButton, setShowTopButton] = useState(false);
    const [showBottomButton, setShowBottomButton] = useState(true);

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        setShowTopButton(scrollTop > 160);
        setShowBottomButton(scrollTop + clientHeight < scrollHeight - 360);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`fixed right-2 md:right-4 bottom-4 ${!showBottomButton ? 'text-gray-400' : 'text-blue-500'}  text-4xl md:text-5xl flex flex-col gap-1`}>
            {showTopButton && (
                <button onClick={scrollToTop} className="cursor-pointer hover:text-furry transition-all duration-500">
                    <IoIosArrowDropup />
                </button>
            )}
            {showBottomButton && (
                <button onClick={scrollToBottom} className="cursor-pointer hover:text-furry transition-all duration-500">
                    <IoIosArrowDropdown />
                </button>
            )}
        </div>
    );
};

export default ScrollButtons;
