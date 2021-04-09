import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { fetchRecommenderQueryResults } from '../../redux/recommender/recommender.actions';
import { selectIngredFrequencyList } from '../../redux/user/user.selectors';
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

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';



const RecipeListLoader = SpinningLoader(RecipeList);


function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'absolute',
        justifyContent: 'center',
    // maxWidth: '90vw',
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
    marginLeft: '15px',
    marginTop: '15px',
    maxWidth: '90vw',
    },
    chip: {
    margin: theme.spacing(0.5),
    },
}));



const RecommenderPage = ({frequencyList, fetchRecommenderQueryResults, isUpdated}) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    useEffect(() => {
        if (frequencyList) {
            fetchRecommenderQueryResults(frequencyList);
        }
    }, [fetchRecommenderQueryResults])
    
    return (
        <div>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} sm={2}>                    
                    <Paper component="ul" className={classes.stats}>
                        <Typography className={classes.chip}>
                            Your top ingredients: 
                        </Typography>
                        {frequencyList ? 
                            frequencyList.map((data) => {
                                return (
                                <li key={data.key}>
                                    <Chip
                                    // variant="outlined"
                                    label={data}
                                    className={classes.chip}
                                    color="secondary"
                                    />
                                </li>
                                );
                            }) : undefined
                        }
                        </Paper>

                </Grid>
                <Grid item xs={12} sm={10}>
                    <div className={classes.tabs}>
                        <AppBar position="static" className={classes.appBar} >
                            <Tabs 
                                textColor="primary"
                                value={value} 
                                onChange={handleChange} 
                            >
                                <Tab className={classes.tab} label="Suggestions" id = 'tab-Suggestions'/>
                                <Tab className={classes.tab} label="Meal Plan" id = 'tab-Meal Plan' />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <RecipeListLoader isLoading={!isUpdated}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MealPlan days={4}/>
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    frequencyList: selectIngredFrequencyList,
    isUpdated: selectIsUpdated
  });

const mapDispatchToProps = dispatch => ({
    fetchRecommenderQueryResults: (queryParams) => dispatch(fetchRecommenderQueryResults(queryParams, dispatch))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(RecommenderPage);
