import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, userLoading } = useAuth();

	if (user) {
		return (
			<ReactPlaceholder
				showLoadingAnimation
				type="text"
				className="m-10"
				widths={['100%']}
				color="#6897bb"
				rows={48}
				ready={!userLoading}
			>
				{children}
			</ReactPlaceholder>
		);
	}
	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
