import { Link } from 'react-router-dom';
import LatestHeadlines from '../LatestHeadlines/LatestHeadlines';
import moment from 'moment';
import { useEffect, useState } from 'react';

const SiteTitle = () => {
    const [currentTime, setCurrentTime] = useState(moment().format('MMMM DD, YYYY hh:mm:ss A'));

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentTime(moment().format('dddd, MMMM DD, YYYY • hh:mm:ss A'));
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    return (
        <div className='max-w-screen-2xl flex flex-col items-stretch justify-center gap-1 mx-auto border-b border-nexus-secondary px-3 py-2 bg-nexusBG bg-opacity-100 z-50 text-nexus-secondary overflow-hidden'>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1" title="Nexus News">
                <Link to="/">
                    <div className="flex flex-col font-kreonSerif">
                        <h3 className="text-xl md:text-4xl font-semibold text-nexus-secondary">Nexus <span className='text-nexus-primary'>News</span></h3>
                    </div>
                </Link>
                <h3>{currentTime}</h3>
            </div>
            <LatestHeadlines />
        </div>
    );
};

export default SiteTitle;