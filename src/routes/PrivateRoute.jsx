import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
// import loading from '../assets/loading.svg';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, userLoading } = useAuth();
    
    if (userLoading) {
        return (
            <div className="flex items-center justify-center space-x-2">
              {/*  <img src={loading} alt="loading" /> */}
            </div>
        )
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
