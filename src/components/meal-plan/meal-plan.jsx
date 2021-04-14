import React, { useState } from 'react'
import { selectMealPlan } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import RecipeCard from '../recipe-card/recipe-card';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    fontWeight: 501,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textColor: 'primary'
  },
}));
// https://www.techiedelight.com/initialize-array-with-range-from-0-to-n-javascript/
// https://stackoverflow.com/questions/57739391/firestore-query-for-loop-with-multiple-values
const MealPlan = ({mealPlan}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
      
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className={classes.root}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.tabs}
            >
          {
            [...Array(mealPlan.length).keys()].map(number => <Tab className={classes.tab} label={`Day ${number + 1}`} id= {number + 1} /> )
          }
          </Tabs>
        {mealPlan.map(data => 
          (<TabPanel value={value} index={data.day - 1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper component='ul'>
                  <Typography> Breakfast </Typography>
                  {data.breakfast.recipe ? (
                        <RecipeCard key={`day-${data.day}-breakfast`} recipeData={{id: data.breakfast.id, recipe: data.breakfast.recipe}}/>
                  ): null}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper component='ul'>
                  <Typography> Lunch </Typography>
                  {data.lunch.recipe ? (
                    <RecipeCard key={`day-${data.day}-lunch`} recipeData={{id: data.lunch.id, recipe: data.lunch.recipe}}/>
                  ): null}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper component='ul'>
                  <Typography> Dinner </Typography>
                  {data.dinner.recipe ? (
                    <RecipeCard key={`day-${data.day}-dinner`} recipeData={{id: data.dinner.id, recipe: data.dinner.recipe}}/>
                  ): null}
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>))
        } 
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  mealPlan: selectMealPlan
});

export default connect(mapStateToProps, null)(MealPlan);