import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import ConfirmPassword from './ConfirmPassword';

import {updateAccountProfile} from '../../../_actions/users';

import {getProfile} from '../../../_actions/auth';

import {useInterval} from '../../../_helpers/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
// TODO: Make fully functional for testing tomorrow
const SettingsView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {profile: currentUserProfile} = useSelector((state)=>state.auth)

  useEffect(()=>{
    dispatch(getProfile())
    .then(response => console.log(currentUserProfile))
  },[dispatch])

  // TODO: Add modal for confirm password upon hitting save details
  // TODO: Implement API updating of user info.
  return (currentUserProfile && 
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Profile currentUserProfile={currentUserProfile}/>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <ProfileDetails currentUserProfile={currentUserProfile} />
          </Grid>
        </Grid>
        
      </Container>
    </Page>
  );
};

export default SettingsView;
