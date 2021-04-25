import React, { useState } from 'react';
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
  const [employee] = useState(data);

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
        <Grid item xs>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Account Manager/Owner Access
            </Typography>
              <Box mt={2}>
                {employee.map((employee) => (
                  <Grid
                    item
                    key={employee.id}
                    lg={12}
                    md={6}
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
          <Grid item xs>
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="h5"
            >
              Production Team Access
            </Typography>
              <Box mt={2}>
                {employee.map((employee) => (
                  <Grid
                    item
                    key={employee.id}
                    lg={12}
                    md={6}
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
            <Grid item xs>
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="h5"
              >
                Driver Access
              </Typography>
                <Box mt={2}>
                  {employee.map((employee) => (
                    <Grid
                      item
                      key={employee.id}
                      lg={12}
                      md={6}
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
