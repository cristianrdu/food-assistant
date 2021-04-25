import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core/';

import RecipeCard from '../recipe-card/recipe-card';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '25px',
    display: 'grid',
    gridGap: '30px',
    margin: 'auto'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'capitalize'
  },
  title2: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const MainRecipeList = ({ recipes, match }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} color="primary" component="h1" variant="h5"> 
      {match.params.routeUrl} Recipes
      </Typography>
      {recipes.length ? 
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
         { recipes.map(recipe => (
            <Grid item xs={12} sm={6} md={3} key={recipes.indexOf(recipe)}>
              <RecipeCard key={recipe.id} recipeData={recipe} />
            </Grid>
          ))}
        </Grid> :
        <Typography className={classes.title2}>
        There are no recipes available for this category yet.
        </Typography>
      }
    </div>
  );
};

export default MainRecipeList;
