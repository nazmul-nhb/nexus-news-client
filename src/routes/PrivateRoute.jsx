import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { articleLoader } from '../components/LoadingSpinners/Loaders';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, userLoading } = useAuth();

    if (userLoading) {
        return articleLoader
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
