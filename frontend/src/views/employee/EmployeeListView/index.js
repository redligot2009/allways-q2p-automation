import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import EmployeeCard from './EmployeeCard';
import AddEmployeeDialog from './AddEmployeeDialog';
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

  const [openAddEmployeeDialog, setOpenAddEmployeeDialog] = useState(true);
  const [employeeType, setEmployeeType] = useState('O');

  return (
    <Page
      className={classes.root}
      title="Order Tracking"
    >
      <Container maxWidth={false}>
        <AddEmployeeDialog
          employeeType={employeeType}
          openAddEmployeeDialog={openAddEmployeeDialog}
          handleCloseAddEmployeeDialog={()=>{
            setOpenAddEmployeeDialog(false);
          }}
          setOpenAddEmployeeDialog={setOpenAddEmployeeDialog}
        />
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
              <Box my={1}>
                <Grid container style={{maxHeight:540,overflow:'auto'}} my={1}>
                  {accountManagers && accountManagers.map((employee) => (
                    <Grid
                      item
                      key={employee.id}
                      xs={12}
                    >
                      <EmployeeCard
                        className={classes.employeeCard}
                        employee={employee}
                      />
                    </Grid>
                  ))}
                  {owners && owners.map((employee) => (
                    <Grid
                      item
                      key={employee.id}
                      xs={12}
                    >
                      <EmployeeCard
                        className={classes.employeeCard}
                        employee={employee}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Grid container>
                <Grid item xs={12} sm={6} md={12}>
                  <Button
                      color="primary"
                      // disabled={isSubmitting}
                      fullWidth
                      size="small"
                      type="button"
                      variant="outlined"
                      onClick={()=>{
                        setEmployeeType('AM');
                        setOpenAddEmployeeDialog(true);
                      }}
                      // onClick={handleSubmit}
                  >
                      Add Account Manager
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="small"
                    type="button"
                    variant="outlined"
                    onClick={()=>{
                      setEmployeeType('O');
                      setOpenAddEmployeeDialog(true);
                    }}
                    // onClick={handleSubmit}
                  >
                    Add Owner
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                Production Team Access
              </Typography>
              <Box my={1}>
                <Grid container style={{maxHeight:540,overflow:'auto'}}>
                  {productionEmployees && productionEmployees.map((employee) => (
                    <Grid
                      item
                      key={employee.id}
                      xs={12}
                    >
                      <EmployeeCard
                        className={classes.employeeCard}
                        employee={employee}
                      />
                    </Grid>
                  ))}  
                </Grid>
              </Box>
              <Button
                color="primary"
                // disabled={isSubmitting}
                fullWidth
                size="small"
                type="button"
                variant="outlined"
                onClick={()=>{
                  setEmployeeType('P');
                  setOpenAddEmployeeDialog(true);
                }}
                // onClick={handleSubmit}
              >
                Add Production Employee
              </Button>
            </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  className={classes.name}
                  color="textSecondary"
                  variant="h5"
                >
                  Driver Access
                </Typography>
                <Box my={1}>
                  <Grid container style={{maxHeight:540,overflow:'auto'}}>
                    {driverEmployees && driverEmployees.map((employee) => (
                      <Grid
                        item
                        key={employee.id}
                        xs={12}
                      >
                        <EmployeeCard
                          className={classes.employeeCard}
                          employee={employee}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Button
                  color="primary"
                  // disabled={isSubmitting}
                  fullWidth
                  size="small"
                  type="button"
                  variant="outlined"
                  onClick={()=>{
                    setEmployeeType('D');
                    setOpenAddEmployeeDialog(true);
                  }}
                  // onClick={handleSubmit}
                >
                  Add Driver Employee
                </Button>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default EmployeeList;
