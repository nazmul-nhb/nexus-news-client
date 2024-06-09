import ripple from '../../assets/nexus-ripple.svg';
import search from '../../assets/nexus-search.svg';
import globe from '../../assets/nexus-globe.svg';

const buttonLoader = (
    <div className="flex flex-col items-center justify-center">
        <img className='w-6 h-6' src={ripple} alt="Loading..." />
    </div>
);

const articleLoader = (
    <div className="flex flex-col items-center justify-center">
        <img src={globe} alt="Loading..." />
    </div>
);

const searchLoader = (
    <div className="flex flex-col items-center justify-center">
        <img src={search} alt="Searching..." />
    </div>
);

export { buttonLoader, articleLoader, searchLoader };