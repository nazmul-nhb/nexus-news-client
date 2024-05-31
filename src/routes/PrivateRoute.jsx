import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
// import pacman from '../assets/pacman.svg';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, userLoading } = useContext(AuthContext);
    
    if (userLoading) {
        return (
            <div className="flex items-center justify-center space-x-2">
              {/*  <img src={pacman} alt="pacman" /> */}
            </div>
        )
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;
