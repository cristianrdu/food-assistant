import React, { useState, useEffect } from 'react'
import { getRandomRecipes } from '../../data/firebase/firebase.utils';
import { sortRecipesByDay } from '../../data/data.utils';

import RecipeCard from '../recipe-card/recipe-card';

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
// https://www.techiedelight.com/initialize-array-with-range-from-0-to-n-javascript/
// https://stackoverflow.com/questions/57739391/firestore-query-for-loop-with-multiple-values
const MealPlan = () => {
    const classes = useStyles();
    const days = 4;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
        
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() =>{
        populateRecipes();

        async function populateRecipes(){
            try {
                // set loading to true before calling API
                setLoading(true);
                const data = await getRandomRecipes(days);
                setRecipes(sortRecipesByDay(data));
                console.log(data);
                // switch loading to false after fetch is complete
                setLoading(false);
            } catch (error) {
                // add error handling here
                setLoading(false);
                console.log(error);
            }
        }
    },[]);

    return (
        <div>
            { !loading ? 
                
                (
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                        {
                            [...Array(days).keys()].map(number => <Tab label={`Day ${number + 1}`} id= {`day-${number + 1}`} /> )
                        }
                        </Tabs>
                        {   recipes && recipes.length > 0 ?
                            recipes.map(oneDayRecipes => 
                            (<TabPanel value={value} index={oneDayRecipes.key + 1}>
                                {
                                    oneDayRecipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe}/>))
                                }
                            </TabPanel>)) 
                            : undefined
                        }
                        
                    </div>
                )

                : null
            }
        </div>
    )
}

export default MealPlan
