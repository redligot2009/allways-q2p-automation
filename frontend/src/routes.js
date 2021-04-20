import React from 'react';
import { Navigate, Redirect } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ReviewListView from 'src/views/review/ReviewListView';

// import { getProfile } from '_services';

const limitRouteAccess = (roles, element, currentUserProfile) =>
{
  // const currentUserProfile = getProfile();
  if (!currentUserProfile) {
    // console.log("Go back to log in")
    return <Navigate to="/login"/>
  }
  else if(roles.length > 0 && roles.indexOf(currentUserProfile.job_position) ===-1)
  {
    // console.log("Go back to home")
    return <Navigate to="/"/>
  }
  // console.log("what is happening?")
  return element;
}

const routes = (currentUserProfile) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: limitRouteAccess([], <AccountView />,currentUserProfile) },
      { path: 'customers', element: limitRouteAccess(['O','AM'], <CustomerListView />,currentUserProfile) },
      { path: 'review', element: limitRouteAccess(['O', 'AM'], <ReviewListView />,currentUserProfile)},
      { path: 'dashboard', element: limitRouteAccess([],<DashboardView />,currentUserProfile)},
      { path: 'products', element: limitRouteAccess([],<ProductListView />,currentUserProfile)},
      { path: 'settings', element: limitRouteAccess([],<SettingsView />,currentUserProfile)},
      { path: '*', element: limitRouteAccess([],<Navigate to="/404" />,currentUserProfile)}
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'logout', element: <Navigate to="/login"/>},
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
