import PropTypes from 'prop-types';

const Plans = ({ inSubscriptionPage }) => {


    return (
        <section className="w-full mx-auto gap-3 lg:grid grid-cols-5 ">

            {inSubscriptionPage ||
                <div className="border border-nexus-primary p-3 rounded-xl">
                    <h3 className="text-center">Free</h3>
                    <ul>
                        <li>Browse Free Articles Only</li>
                        <li>No Premium Access</li>
                        <li>Won&rsquo;t Get Updates</li>
                        <li>Can Post only 1 Article</li>
                    </ul>
                </div>}

            <div className="border border-nexus-primary p-3 rounded-xl">
                <h3 className="text-center">Minute Monitor</h3>
                <ul>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 1 Minute</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <button>Try for 1 Day</button>}
            </div>

            <div className="border border-nexus-primary p-3 rounded-xl">
                <h3 className="text-center">Weekly Wrap-Up</h3>
                <ul>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 7 Days</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <button>Try for 7 Days</button>}
            </div>

            <div className="border border-nexus-primary p-3 rounded-xl">
                <h3 className="text-center">Monthly Marvel</h3>
                <ul>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 1 Month</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <button>Try for 30 Days</button>}
            </div>

            <div className="border border-nexus-primary p-3 rounded-xl">
                <h3 className="text-center">Yearly Yonder</h3>
                <ul>
                    <li>Browse Premium News</li>
                    <li>Access Premium Features for 1 Days</li>
                    <li>Exclusive Updates</li>
                    <li>Can Post more than 1 Article</li>
                </ul>
                {inSubscriptionPage || <button>Try for 365 Days</button>}
            </div>

        </section>
    );
};

Plans.propTypes = {
    inSubscriptionPage: PropTypes.bool,
}

export default Plans;