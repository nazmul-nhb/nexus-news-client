import PropTypes from 'prop-types';
import { buttonInvert, buttonNormal } from '../../utilities/buttonStyles';
import { useNavigate } from 'react-router-dom';

const Plans = ({ inSubscriptionPage }) => {
    const navigate = useNavigate();

    return (
        <section className="w-full mx-auto gap-3 lg:grid grid-cols-4 ">

            {/* {inSubscriptionPage ||
                <div className="border border-nexus-secondary p-3 rounded-xl shadow-md shadow-nexus-primary bg-nexusBG text-nexus-primary flex flex-col gap-3">
                    <h3 className="text-center font-bold font-kreonSerif text-3xl">Free</h3>
                    <ul className='flex-grow text-lg list-disc ml-6'>
                        <li>Browse Free Articles Only</li>
                        <li>No Premium Access</li>
                        <li>Won&rsquo;t Get Updates</li>
                        <li>Can Post only 1 Article</li>
                    </ul>
                </div>} */}

            <div className="border border-nexus-secondary p-3 rounded-xl shadow-md shadow-nexus-primary bg-nexusBG text-nexus-primary flex flex-col gap-3">
                <h3 className="text-center font-bold font-kreonSerif text-3xl">Minute Monitor</h3>
                <ul className='flex-grow text-lg list-disc ml-6'>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 1 Minute</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <div className='flex items-center justify-center'><button
                    onClick={() => navigate('/subscription')}
                 className={`${buttonNormal}`}>Try for 1 Day</button></div>}
            </div>

            <div className="border border-yellow-700 p-3 rounded-xl shadow-md shadow-yellow-700 bg-yellow-100 bg-opacity-75 text-yellow-700 flex flex-col gap-3">
                <h3 className="text-center font-bold font-kreonSerif text-3xl">Weekly Wrap-Up</h3>
                <ul className='flex-grow text-lg list-disc ml-6'>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 7 Days</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <div className='flex items-center justify-center'><button
                    onClick={() => navigate('/subscription')}
                    className={`${buttonInvert} text-white bg-yellow-700 border-yellow-700 hover:border-yellow-700 hover:bg-transparent hover:text-yellow-700`}>Try for 7 Days</button></div>}
            </div>

            <div className="border border-green-700 p-3 rounded-xl shadow-md shadow-green-700 bg-green-100 bg-opacity-75 text-green-700 flex flex-col gap-3">
                <h3 className="text-center font-bold font-kreonSerif text-3xl">Monthly Marvel</h3>
                <ul className='flex-grow text-lg list-disc ml-6'>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 1 Month</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <div className='flex items-center justify-center'><button 
                    onClick={() => navigate('/subscription')}
                className={`${buttonInvert} text-white bg-green-700 border-green-700 hover:border-green-700 hover:bg-transparent hover:text-green-700`}>Try for 30 Days</button></div>}
            </div>

            <div className="border border-orange-700 p-3 rounded-xl shadow-md shadow-orange-700 bg-orange-100 bg-opacity-75 text-orange-700 flex flex-col gap-3">
                <h3 className="text-center font-bold font-kreonSerif text-3xl">Yearly Yonder</h3>
                <ul className='flex-grow text-lg list-disc ml-6'>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 1 Days</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <div className='flex items-center justify-center'><button
                    onClick={() => navigate('/subscription')}
                    className={`${buttonInvert} text-white bg-orange-700 border-orange-700 hover:border-orange-700 hover:bg-transparent hover:text-orange-700`}>Try for 365 Days</button></div>}
            </div>

        </section>
    );
};

Plans.propTypes = {
    inSubscriptionPage: PropTypes.bool,
}

export default Plans;