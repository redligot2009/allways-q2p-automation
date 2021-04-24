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
import TrackingAMListView from 'src/views/tracking_am/ProductListView';
import TrackingPRODListView from 'src/views/tracking_prod/ProductListView';
import TrackingDELListView from 'src/views/tracking_deliv/ProductListView';
import TrackingCUSTListView from 'src/views/tracking_cus/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import QuotationReviewList from 'src/views/quotations/QuoteReviewListView';
import QuotationReviewDetail from 'src/views/quotations/QuoteReviewDetailView';
import RequestForQuotation from 'src/views/quotations/RequestForQuotationView';
import ProductView from 'src/views/product/ProductListView';
import EmployeeView from 'src/views/employee/ProductListView';

function Routes() {

  const dispatch = useDispatch()

  const fetchProfileFinished = useRef(false);

  useEffect(()=>{
    (async function fetchProfile () {
      await dispatch(getProfile())
            .then((response)=>{
              fetchProfileFinished.current = true;
            })
            .catch((error)=>{
              dispatch(logout())
              fetchProfileFinished.current = true;
            })
    })();
  },[]);

  const { profile: currentUserProfile } = useSelector((state) => state.auth)
  
  console.log("Found profile, ", currentUserProfile);

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
          { path: 'request', element: <RequestForQuotation/>},
        ]},
        // { path: 'review', element: limitRouteAccess(['O', 'AM'], <QuotationReviewList />)},
        { path: 'dashboard', element: limitRouteAccess([],<DashboardView />)},
        { path: 'employees', element: limitRouteAccess(['O','AM'],<EmployeeView />) },
        { path: 'products', element: limitRouteAccess([],<ProductView />)},
        { path: 'settings', element: limitRouteAccess([],<SettingsView />)},
        { path: '*', element: limitRouteAccess([],<Navigate to="/404" />)},
        { path: 'tracking', children: [
          { path: 'account_manager', element: limitRouteAccess(['O','AM',], <TrackingAMListView />) },
          { path: 'production_employee', element: limitRouteAccess(['P'], <TrackingPRODListView />) },
          { path: 'delivery_man', element: limitRouteAccess(['D'], <TrackingDELListView />) },
          { path: 'customer', element: limitRouteAccess([], <TrackingCUSTListView />) },
        ]}
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
