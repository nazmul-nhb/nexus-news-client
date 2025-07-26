import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useGetUserType from '../hooks/useGetUserType';

const PremiumRoute = ({ children }) => {
	const { user, userLoading } = useAuth();
	const { premiumUser, premiumLoading } = useGetUserType();

	const location = useLocation();

	if (userLoading || premiumLoading) {
		return (
			<ReactPlaceholder
				showLoadingAnimation
				type="text"
				rows={48}
				widths={['100%']}
				ready={false}
				color="#6897bb"
				className="p-10 max-w-full"
			>
				<div style={{ maxWidth: '100%', width: '100%', height: '75vh' }} />
			</ReactPlaceholder>
		);
	}

	if (user && premiumUser) {
		return children;
	}

	return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

PremiumRoute.propTypes = {
	children: PropTypes.node,
};

export default PremiumRoute;
