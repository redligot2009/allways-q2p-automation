import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuotationCard from './QuotationCard';
import QuotationCardComputed from './QuotationCardComputed';
// import data from './data';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  quotationCard: {
    height: '100%'
  }
}));

const QuotationReviewList = () => {
  const classes = useStyles();
  const [data, setData] = useState({in_progress:[],computed:[]});
  
  useEffect(() => {
    async function fetchData(){
      const in_progress = await axios.get('api/quotations/?approval_status=in_progress');
      const computed = await axios.get('api/quotations/?approval_status=computed');
      // console.log(in_progress.data);
      // console.log(computed.data);
      setData({ in_progress: in_progress.data, computed: computed.data});
    }
    fetchData();
  }, [])

  return (
    <Page
      className={classes.root}
      title="Quote Review"
    >
      <Container maxWidth={false}>
        <Typography className={classes.name} color="textPrimary" variant="h2">
          Quote Review
        </Typography>
        <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography className={classes.name} color="textSecondary" variant="h5">
              Awaiting Computation
            </Typography>
              <Box mt={2}>
                {data.in_progress.map((quotation) => (
                  <Grid item key={quotation.id} lg={12} md={6} xs={12}>
                    <Box mt={2}>
                      <QuotationCard 
                        className={classes.quotationCard} 
                        quotation={quotation}
                      />
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid item xs>
              <Typography className={classes.name} color="textSecondary" variant="h5">
                Awaiting Approval
              </Typography>
                <Box mt={2}>
                  {data.computed.map((quotation) => (
                    <Grid item key={quotation.id} lg={12} md={6} xs={12}>
                      <Box mt={2}>
                        <QuotationCardComputed
                          className={classes.quotationCard}
                          quotation={quotation}
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

export default QuotationReviewList;
