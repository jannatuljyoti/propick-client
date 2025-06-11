import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Loading';


const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate to="/auth/login" state={{from: location}} replace/>
    }
    return children;
};

export default PrivateRoute;