import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { setMealPlan } from '../../redux/user/user.actions';
import { selectHistoryFrequencyList, selectIngredFrequencyList, selectNrDaysMealPlan, selectMealPlanFetched } from '../../redux/user/user.selectors';
import { fetchAllTimeSearchResults, fetchRecentsSearchResults } from '../../redux/recommender/recommender.actions';

import Grid from '@material-ui/core/Grid';

import MealPlan from '../../components/meal-plan/meal-plan';
import RecommenderTab from '../../components/recommender-tab/recommender-tab';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from '@material-ui/core';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const sliderMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '1',
  },
  {
    value: 40,
    label: '2',
  },
  {
    value: 60,
    label: '3',
  },
  {
    value: 80,
    label: '4',
  },
  {
    value: 100,
    label: '5',
  },
];

const valueLabelFormat = (value) => {
  return sliderMarks.findIndex((mark) => mark.value === value);
};

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    maxWidth: '90vw',
  },  
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: '15px',
    maxWidth: '90vw',
  },
  appBar: {
      background: 'white',
  },
  tab: {
      fontWeight: 501,
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginTop: '15px',
    maxWidth: '90vw',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  daySlider: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '90vw',
    marginTop: '20px',
    padding: 15
  },
  sliderButton: {
    marginTop: '10px',     
    marginLeft:'auto'
  }
}));

const RecommenderPage = ({fetchRecentsSearchResults, fetchAllTimeSearchResults, nrDaysMealPlan, frequencyList, mealPlanFetched, setMealPlan, historyFrequencyList}) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [days, setDays] = useState(nrDaysMealPlan);

  const changeCurrentTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const setMealPlanDays = (event, day) => {
    setDays(valueLabelFormat(day));
  };

  useEffect(() => {
      if (frequencyList) {
          fetchAllTimeSearchResults(frequencyList);
      }
  }, [fetchAllTimeSearchResults]);

  useEffect(() => {
      if (historyFrequencyList && historyFrequencyList.length > 0) {
          fetchRecentsSearchResults(historyFrequencyList);
      }
  }, [fetchRecentsSearchResults]);


  

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={2} className={classes.leftBar}>
          <Paper component="ul" className={classes.stats}>
            {frequencyList && frequencyList.length > 0 ? 
                [<Typography className={classes.chip}>
                    Your all-time top ingredients: 
                </Typography>,
                frequencyList.map((data) => {
                    return (
                    <li key={data}>
                        <Chip label={data} className={classes.chip} color="secondary"/>
                    </li>
                    );
                })] : <Typography className={classes.chip}>
                  You need to add recipes to history in order to see your top ingredients used.
              </Typography>}
          </Paper>
          <Paper component="ul" className={classes.stats}>
            {historyFrequencyList && historyFrequencyList.length > 0 ? 
                [<Typography className={classes.chip}>
                    Recently used ingredients: 
                </Typography>,
                historyFrequencyList.map((data) => {
                    return (
                    <li key={data}>
                        <Chip label={data} className={classes.chip} color="secondary"/>
                    </li>
                    );
                })] : <Typography className={classes.chip}>
                  You need to add recipes to history in order to see your recent ingredients used.
              </Typography>}
          </Paper>
          <Paper component="ul" className={classes.daySlider}>
            <Typography id="discrete-slider" gutterBottom>
              Nr. of days in Meal Plan
            </Typography>
            <Slider
              defaultValue={nrDaysMealPlan * 20}
              valueLabelFormat={valueLabelFormat}
              aria-labelledby="discrete-slider"
              step={null}
              onChange={setMealPlanDays}
              valueLabelDisplay="auto"
              marks={sliderMarks}
            />
            <Button 
            className={classes.sliderButton} 
            variant="contained" 
            color="secondary" 
            onClick={() => setMealPlan(days)}
            >
              Generate
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <div className={classes.tabs}>
            <AppBar position="static" className={classes.appBar} >
              <Tabs 
                textColor="primary"
                value={currentTab} 
                onChange={changeCurrentTab} 
              >
                <Tab className={classes.tab} label="Suggestions" id = 'tab-Suggestions'/>
                <Tab className={classes.tab} label="Meal Plan" id = 'tab-Meal Plan' />
              </Tabs>
            </AppBar>
            <TabPanel value={currentTab} index={0}>
              <RecommenderTab/>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              {mealPlanFetched ? 
              <MealPlan/> : <Typography>You don't have a meal plan set up yet.</Typography>}
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  frequencyList: selectIngredFrequencyList,
  historyFrequencyList: selectHistoryFrequencyList,
  mealPlanFetched: selectMealPlanFetched,
  nrDaysMealPlan: selectNrDaysMealPlan
});

const mapDispatchToProps = dispatch => ({
  setMealPlan: (days) => dispatch(setMealPlan(days, dispatch)),
  fetchAllTimeSearchResults: (queryParams) => dispatch(fetchAllTimeSearchResults(queryParams, dispatch)),
  fetchRecentsSearchResults: (queryParams) => dispatch(fetchRecentsSearchResults(queryParams, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommenderPage);
