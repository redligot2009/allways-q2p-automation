import React from 'react';
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
import Password from './Password';

import {updateAccountProfile} from '../../../_actions/users';

import {getProfile} from '../../../_actions/auth';

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

  return (
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
            <Profile />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
        <Box mt={3}>
          {/* <Password /> */}
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
