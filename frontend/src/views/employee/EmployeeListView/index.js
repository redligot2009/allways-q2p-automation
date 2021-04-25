import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import EmployeeCard from './EmployeeCard';
import data from './data';
import {
  getAccountManagerEmployees,
  getOwnerEmployees,
  getDriverEmployees,
  getProductionEmployees,
} from "../../../_actions/users";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  employeeCard: {
    height: '100%'
  }
}));

const EmployeeList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {accountManagers} = useSelector(state=>state.users);
  const {owners} = useSelector(state=>state.users);
  const {productionEmployees} = useSelector(state=>state.users);
  const {driverEmployees} = useSelector(state=>state.users);
  // const [employee] = useState(data);

  useEffect(()=>{
    async function fetchData () {
      await dispatch(getAccountManagerEmployees())
        .then((response)=>{
          console.log(response);
        })
        .catch((error)=>{
          console.log(error);
        })
      await dispatch(getOwnerEmployees())
      await dispatch(getDriverEmployees())
      await dispatch(getProductionEmployees())
      console.log(accountManagers);
    }
    fetchData();
  },[]);

  return (
    <Page
      className={classes.root}
      title="Order Tracking"
    >
      <Container maxWidth={false}>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h2"
        >
          Employee Authorization
        </Typography>
        <Box mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Account Manager/Owner Access
            </Typography>
              <Box mt={2}>
                {accountManagers && accountManagers.map((employee) => (
                  <Grid
                    item
                    key={employee.id}
                    xs={12}
                  >
                    <Box mt={2}>
                    <EmployeeCard
                      className={classes.employeeCard}
                      employee={employee}
                    />
                    </Box>
                  </Grid>
                ))}
                {owners && owners.map((employee) => (
                  <Grid
                    item
                    key={employee.id}
                    xs={12}
                  >
                    <Box mt={2}>
                    <EmployeeCard
                      className={classes.employeeCard}
                      employee={employee}
                    />
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Production Team Access
            </Typography>
              <Box mt={2}>
                {productionEmployees && productionEmployees.map((employee) => (
                  <Grid
                    item
                    key={employee.id}
                    xs={12}
                  >
                    <Box mt={2}>
                    <EmployeeCard
                      className={classes.employeeCard}
                      employee={employee}
                    />
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                Driver Access
              </Typography>
                <Box mt={2}>
                  {driverEmployees && driverEmployees.map((employee) => (
                    <Grid
                      item
                      key={employee.id}
                      xs={12}
                    >
                      <Box mt={2}>
                      <EmployeeCard
                        className={classes.employeeCard}
                        employee={employee}
                      />
                      </Box>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </Page>
  );
};

export default EmployeeList;
