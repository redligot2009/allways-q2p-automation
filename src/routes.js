import React, {useEffect, useRef} from 'react';
import { Navigate, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "./_actions/auth";
import { useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';

import OrderTrackingView from 'src/views/tracking_cus/OrderTrackingView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import QuotationReviewList from 'src/views/quotations/QuoteReviewListView';
import QuotationReviewDetail from 'src/views/quotations/QuoteReviewDetailView';
import RequestForQuotation from 'src/views/quotations/RequestForQuotationView';
import ProductView from 'src/views/product/ProductListView';
import EmployeeView from 'src/views/employee/EmployeeListView';
import {useInterval} from 'src/_helpers/hooks'

function Routes() {

  const dispatch = useDispatch()

  const { profile: currentUserProfile } = useSelector((state) => state.auth)

  const fetchProfileFinished = useRef(false);
  // TODO: Get rid of useInterval. Make functional with only one initial call.

  useEffect(()=>{
    async function initialFetchProfile () {
      await dispatch(getProfile())
        .then((response)=>{
          fetchProfileFinished.current = true;
        })
        .catch((error)=>{
          if(currentUserProfile === null)
          {
            dispatch(logout())
          }
          fetchProfileFinished.current = true;
        })
    }
    initialFetchProfile()
  }, [dispatch])
  
  // console.log("Found profile, ", currentUserProfile);

  const limitRouteAccess = (roles, element) =>
  {
    // const currentUserProfile = getProfile();
    if(fetchProfileFinished.current)
    {
      if (currentUserProfile === null) {
        // console.log("Go back to log in ", currentUserProfile)
        return <Navigate to="/login"/>
      }
      else if(roles.length > 0 && roles.indexOf(currentUserProfile.job_position) ===-1)
      {
        // console.log("Go back to home")
        return <Navigate to="/"/>
      }
    }
    // console.log("what is happening?")
    return element;
  }
  // TODO: Change default home page to log-in screen
  let routes = [
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'account', element: limitRouteAccess([], <AccountView />) },
        { path: 'customers', element: limitRouteAccess(['O','AM'], <CustomerListView />) },
        { path:'quote', children: [
          { path: 'review', element: limitRouteAccess(['O', 'AM'], <QuotationReviewList />)},
          { path: 'detail', element: limitRouteAccess(['O', 'AM'],<QuotationReviewDetail/>)},
          { path: 'request', element: limitRouteAccess([],<RequestForQuotation/>)},
        ]},
        // { path: 'review', element: limitRouteAccess(['O', 'AM'], <QuotationReviewList />)},
        { path: 'dashboard', element: limitRouteAccess([],<DashboardView />)},
        { path: 'employees', element: limitRouteAccess(['O','AM'],<EmployeeView />) },
        { path: 'products', element: limitRouteAccess([],<ProductView />)},
        { path: 'settings', element: limitRouteAccess([],<SettingsView />)},
        { path: '*', element: limitRouteAccess([],<Navigate to="/404" />)},
        { path: 'tracking', element: limitRouteAccess([], <OrderTrackingView />) },
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

  const routing = useRoutes(routes);

  return routing;
}

export default Routes
