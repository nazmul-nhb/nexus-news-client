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
        <div className='max-w-screen-2xl flex flex-col items-stretch justify-center gap-4 mx-auto border-b border-nexus-primary px-3 py-2 md:px-10 xl:px-20 bg-white bg-opacity-90 z-50 text-nexus-primary overflow-hidden'>
            <div className="flex items-center justify-between gap-1" title="Nexus News">
                <Link to="/">
                    <div className="flex flex-col font-kreonSerif">
                        <h3 className="text-base md:text-2xl font-semibold text-nexus-primary">Nexus<span className='text-nexus-secondary'>News</span></h3>
                    </div>
                </Link>
                <h3>{currentTime}</h3>
            </div>
            <LatestHeadlines />
        </div>
    );
};

export default SiteTitle;