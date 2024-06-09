import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from '../hooks/useUserRole';
import { articleLoader } from '../components/LoadingSpinners/Loaders';

const AdminRoute = ({ children }) => {
    const { user, userLoading } = useAuth();
    const { role, roleLoading } = useUserRole();

    const location = useLocation();

    if (userLoading || roleLoading) {
        return articleLoader;
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;