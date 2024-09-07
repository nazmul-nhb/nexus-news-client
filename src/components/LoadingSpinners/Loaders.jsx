import ripple from '../../assets/nexus-ripple.svg';
import search from '../../assets/nexus-search.svg';
import infinity from '../../assets/nexus-infinity.svg';

const buttonLoader = (
    <div className="flex items-center justify-center">
        <img className='w-6 h-6' src={ripple} alt="Loading..." />
    </div>
);

const articleLoader = (
    <div className="flex items-center justify-center">
        <img src={infinity} alt="Loading..." />
    </div>
);

const searchLoader = (
    <div className="flex items-center justify-center">
        <img src={search} alt="Searching..." />
    </div>
);

export { buttonLoader, articleLoader, searchLoader };