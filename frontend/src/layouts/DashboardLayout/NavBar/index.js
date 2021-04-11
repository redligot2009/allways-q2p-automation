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
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "../../../_actions/auth";

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
  
  useEffect(()=>{
    async function fetchProfile () {
      await dispatch(getProfile())
            .then((response)=>{
              // console.log("YO SUCCESS ", response);
              // if(!response)
              // {
              //   dispatch(logout())
              // }
            })
            .catch((error)=>{
              // console.log("YO ", error);
              dispatch(logout())
            })
    }
    fetchProfile();
  },[]);
  
  const { profile: currentUserProfile } = useSelector((state) => state.auth) 
  const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(()=>{
  //   console.log("YO! ", currentUser, currentUserProfile);
  // },[]);

  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Client',
    name: (currentUserProfile == null ? 'Mr. Ligot' : currentUserProfile.full_name)
  };

  const items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Home'
    },
    {
      href: '/app/review',
      icon: UsersIcon,
      title: 'Quote Review'
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Order Tracking'
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Manage Employees'
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings'
    },
    {
      href: '/login',
      icon: LockIcon,
      title: 'Login'
    },
    {
      href:'/logout',
      icon: LogOutIcon,
      title:'Logout'
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Register'
    },
    {
      href: '/404',
      icon: AlertCircleIcon,
      title: 'Error'
    }
  ];
  

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
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
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
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
