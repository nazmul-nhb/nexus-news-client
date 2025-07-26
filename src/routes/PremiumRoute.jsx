import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { buttonLoader } from '../components/LoadingSpinners/Loaders';
import useAuth from '../hooks/useAuth';
import useGetUserType from '../hooks/useGetUserType';

const PremiumRoute = ({ children }) => {
	const { user, userLoading } = useAuth();
	const { premiumUser, premiumLoading } = useGetUserType();

	const location = useLocation();

	if (userLoading || premiumLoading) {
		return buttonLoader;
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
