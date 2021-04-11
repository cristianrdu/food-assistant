import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { fetchRecommenderQueryResults } from '../../redux/recommender/recommender.actions';
import { setMealPlan } from '../../redux/user/user.actions';
import { selectIngredFrequencyList, selectNrDaysMealPlan, selectMealPlanFetched } from '../../redux/user/user.selectors';
import { selectIsUpdated } from '../../redux/recommender/recommender.selectors';

import Grid from '@material-ui/core/Grid';

import RecipeList from '../../components/recommender-list/recommender-list';
import MealPlan from '../../components/meal-plan/meal-plan';
import SpinningLoader from '../../components/loader/loader';

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

const RecipeListLoader = SpinningLoader(RecipeList);
const MealPlanLoader = SpinningLoader(MealPlan);

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
  }
}));


const RecommenderPage = ({nrDaysMealPlan, frequencyList, fetchRecommenderQueryResults, isUpdated, mealPlanFetched, setMealPlan}) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [days, setDays] = useState(0);

  const changeCurrentTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const setMealPlanDays = (event, day) => {
    setDays(valueLabelFormat(day));
  };

  useEffect(() => {
    if (frequencyList) {
      fetchRecommenderQueryResults(frequencyList);
    }
  }, [fetchRecommenderQueryResults]);
  

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={2} className={classes.leftBar}>
          <Paper component="ul" className={classes.stats}>
            <Typography className={classes.chip}>
                Your all-time top ingredients: 
            </Typography>
            {frequencyList ? 
                frequencyList.map((data) => {
                    return (
                    <li key={data}>
                        <Chip label={data} className={classes.chip} color="secondary"/>
                    </li>
                    );
                }) : undefined}
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
            <Button className={classes.sliderButton} variant="contained" color="secondary" onClick={() => setMealPlan(days)}>Generate Meal Plan</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <div className={classes.tabs}>
            <AppBar position="static" className={classes.appBar} >
              <Tabs 
                textColor="primary"
                centered
                value={currentTab} 
                onChange={changeCurrentTab} 
              >
                <Tab className={classes.tab} label="Suggestions" id = 'tab-Suggestions'/>
                <Tab className={classes.tab} label="Meal Plan" id = 'tab-Meal Plan' />
              </Tabs>
            </AppBar>
            <TabPanel value={currentTab} index={0}>
              <RecipeListLoader isLoading={!isUpdated}/>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              {/* <MealPlanLoader isLoading={!mealPlanFetched}/> */}
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
  isUpdated: selectIsUpdated,
  mealPlanFetched: selectMealPlanFetched,
  nrDaysMealPlan: selectNrDaysMealPlan
});

const mapDispatchToProps = dispatch => ({
  fetchRecommenderQueryResults: (queryParams) => dispatch(fetchRecommenderQueryResults(queryParams, dispatch)),
  setMealPlan: (days) => dispatch(setMealPlan(days, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommenderPage);
