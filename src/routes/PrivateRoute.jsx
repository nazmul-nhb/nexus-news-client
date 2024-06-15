import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { buttonLoader } from '../components/LoadingSpinners/Loaders';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, userLoading } = useAuth();

    if (userLoading) {
        return buttonLoader
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;
