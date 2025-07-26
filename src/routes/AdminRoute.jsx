import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
	const { user, userLoading } = useAuth();
	const { role, roleLoading } = useUserRole();

	const location = useLocation();

	if (userLoading || roleLoading) {
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

	if (user && role === 'admin') {
		return children;
	}

	return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
	children: PropTypes.node,
};

export default AdminRoute;
