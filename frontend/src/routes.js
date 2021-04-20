import React from 'react';
import { Navigate } from 'react-router-dom';
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

import { getProfile } from '_services';

const limitRouteAccess = (roles, element) =>
{
  const currentUserProfile = getProfile();
  if (!currentUserProfile) {
    return <Navigate to="/login"/>
  }
  if(roles && roles.indexOf(currentUserProfile.job_position) ===-1)
  {
    return <Navigate to="/"/>
  }
  return element;
}

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: limitRouteAccess([], <AccountView />) },
      { path: 'customers', element: limitRouteAccess(['O','AM'], <CustomerListView />) },
      { path: 'review', element: limitRouteAccess(['O', 'AM'], <ReviewListView />)},
      { path: 'dashboard', element: limitRouteAccess([],<DashboardView />)},
      { path: 'products', element: limitRouteAccess([],<ProductListView />)},
      { path: 'settings', element: limitRouteAccess([],<SettingsView />)},
      { path: '*', element: limitRouteAccess([],<Navigate to="/404" />)}
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
