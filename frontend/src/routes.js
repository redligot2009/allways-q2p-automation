import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import TrackingAMListView from 'src/views/tracking_am/ProductListView';
import TrackingPRODListView from 'src/views/tracking_prod/ProductListView';
import TrackingDELListView from 'src/views/tracking_deliv/ProductListView';
import TrackingCUSTListView from 'src/views/tracking_cus/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ReviewListView from 'src/views/review/ReviewListView';
import ProductView from 'src/views/product/ProductListView';
import EmployeeView from 'src/views/employee/ProductListView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'review', element: <ReviewListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'trackingaccount', element: <TrackingAMListView /> },
      { path: 'trackingproduction', element: <TrackingPRODListView /> },
      { path: 'trackingdelivery', element: <TrackingDELListView /> },
      { path: 'trackingcustomer', element: <TrackingCUSTListView /> },
      { path: 'employees', element: <EmployeeView /> },
      { path: 'products', element: <ProductView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
