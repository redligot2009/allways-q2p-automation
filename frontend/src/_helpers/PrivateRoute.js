import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getProfile } from '../_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUserProfile = getProfile();
        if (!currentUserProfile) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login' }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUserProfile.job_position) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)