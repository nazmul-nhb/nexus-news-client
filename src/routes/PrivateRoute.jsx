import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, userLoading } = useAuth();

	if (userLoading) {
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

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
