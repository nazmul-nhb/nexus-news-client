import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';

const SectionHeader = ({ heading, subHeading, info }) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className='text-center space-y-5'>
            <h3 className="text-nexus-primary font-bold max-[430px]:text-xl text-2xl md:text-4xl xl:text-5xl">
                {heading}
            </h3>
            <h4 className="text-nexus-secondary md:text-2xl font-kreonSerif">
                {subHeading}
            </h4>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-nexus-secondary'} mx-auto w-4/5 text-center font-semibold text-sm md:text-lg xl:text-xl`}>
                {info}
            </p>
        </div>
    );
};

SectionHeader.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    info: PropTypes.string,
}

export default SectionHeader;