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
  
  // useEffect(()=>{
  //   async function fetchProfile () {
  //     await dispatch(getProfile())
  //           .then((response)=>{
  //           })
  //           .catch((error)=>{
  //             dispatch(logout())
  //           })
  //   }
  //   fetchProfile();
  // },[dispatch]);
  
  const { profile: currentUserProfile } = useSelector((state) => state.auth) 
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(()=>{
    console.log("YO! ", currentUser, currentUserProfile);
  },[currentUserProfile,currentUser]);

  const setUserProfile = (user) =>
  {
    let newUser = user
    if(currentUserProfile !== null)
    {
      newUser.name = currentUserProfile.full_name
      switch(currentUserProfile.job_position)
      {
        case 'O':
          newUser.jobTitle = "Owner"
          break
        case 'AM':
          newUser.jobTitle = "Account Manager"
          break
        case 'D':
          newUser.jobTitle = "Deliveryman"
          break
        case 'P':
          newUser.jobTitle = "Production Employee"
          break
        default:
          newUser.jobTitle ="Client"
          break
      }
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
      href: '/app/review',
      icon: UsersIcon,
      title: 'Quote Review',
      handleClick: () => {

      },
      restrict_to: ['O','AM'],
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Order Tracking',
      handleClick: () => {

      },
      restrict_to: ['O','AM'],
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
      href: '/app/tracking/account_manager',
      icon: ClipboardIcon,
      title: 'Order Tracking',
      handleClick: () => {

      },
      restrict_to: [],
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Account Settings',
      handleClick: () => {

      },
      restrict_to: [],
    },
    {
      href: '/login',
      icon: LockIcon,
      title: 'Login',
      handleClick: () => {

      },
      restrict_to: [],
    },
    {
      href:'/logout',
      icon: LogOutIcon,
      title:'Logout',
      handleClick: () => {
        dispatch(logout())
      },
      restrict_to: [],
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Register',
      handleClick: () => {

      },
      restrict_to: [],
    },
    {
      href: '/404',
      icon: AlertCircleIcon,
      title: 'Error',
      handleClick: () => {

      },
      restrict_to: [],
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
              onClick={item.handleClick}
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
