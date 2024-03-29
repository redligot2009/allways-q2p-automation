import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  Clipboard as ClipboardIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

import ClipLoader from "react-spinners/ClipLoader";

import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "../../../_actions/auth";

import {getJobPosition, limitVisibility} from "../../../_helpers";

import {v4} from "uuid";
import { uniqueId } from 'lodash';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {

  const dispatch = useDispatch()
  
  const { profile: currentUserProfile } = useSelector((state) => state.auth) 

  // useEffect(()=>{
  //   console.log("YO! ", currentUser, currentUserProfile);
  // },[currentUserProfile,currentUser]);

  const setUserProfile = (user) =>
  {
    let newUser = user
    if(currentUserProfile !== null)
    {
      newUser.name = currentUserProfile.full_name
      newUser.jobTitle = getJobPosition(currentUserProfile.job_position)
    }
    return newUser
  }

  const user = setUserProfile({
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'None',
    name: 'Mr. Ligot'
  });

  const items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Home',
      handleClick: () => {

      },
      restrict_to: [],
    },
    {
      href: '/app/quote/review',
      icon: UsersIcon,
      title: 'Quote Review',
      handleClick: () => {

      },
      restrict_to: ['O','AM'],
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Request Quotation',
      handleClick: () => {

      },
      restrict_to: ['C'],
    },
    {
      href: `/app/tracking/`,
      icon: ClipboardIcon,
      title: 'Order Tracking',
      handleClick: () => {

      },
      restrict_to: [],
    },
    {
      href: '/app/customers',
      icon: UserIcon,
      title: 'Manage Customers',
      handleClick: () => {

      },
      restrict_to: ['O','AM'],
    },
    {
      href: '/app/employees',
      icon: UserIcon,
      title: 'Manage Employees',
      handleClick: () => {

      },
      restrict_to: ['O','AM'],
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Account Settings',
      handleClick: () => {

      },
      restrict_to: [],
    },
    // {
    //   href: '/login',
    //   icon: LockIcon,
    //   title: 'Login',
    //   handleClick: () => {

    //   },
    //   restrict_to: [],
    // },
    {
      href:'/logout',
      icon: LogOutIcon,
      title:'Logout',
      handleClick: () => {
        dispatch(logout())
      },
      restrict_to: [],
    },
    // {
    //   href: '/register',
    //   icon: UserPlusIcon,
    //   title: 'Register',
    //   handleClick: () => {

    //   },
    //   restrict_to: [],
    // },
    // {
    //   href: '/404',
    //   icon: AlertCircleIcon,
    //   title: 'Error',
    //   handleClick: () => {

    //   },
    //   restrict_to: [],
    // }
  ];
  

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfile())
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (items && user &&
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        {currentUserProfile ? 
        <Box
          ml={1}
        >
          <Typography
            className={classes.name}
            color="textPrimary"
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.jobTitle}
          </Typography>
        </Box>
        :
          <>
            <ClipLoader loading={true} size={50} />
          </>
        }
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {(currentUserProfile && items) ? items.map((item, index) => (
            limitVisibility(
              <NavItem
                href={item.href}
                key={item.title.toString()}
                title={item.title}
                icon={item.icon}
                onClick={item.handleClick}
              />,
              item.restrict_to,
              currentUserProfile.job_position,
            )
          )):
          <>
            <ClipLoader loading={true} size={50} />
          </>
          }
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
