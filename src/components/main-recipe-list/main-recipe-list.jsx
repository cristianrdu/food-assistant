import React from 'react';
import { connect } from 'react-redux';
import { Grid, makeStyles, Typography, Paper } from '@material-ui/core/';

import RecipeCard from '../recipe-card/recipe-card';

import { selectCategoricalRecipes } from '../../redux/recipe/recipe.selectors';


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
        <Typography className={classes.title} component="h1" variant="h5">
        There are no recipes available for this category.
        </Typography>
      }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  recipes: selectCategoricalRecipes(ownProps.match.params.routeUrl)(state)
});

export default connect(mapStateToProps)(MainRecipeList);
