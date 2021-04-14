import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core/'

import RecipeCard from '../recipe-card/recipe-card';

import { selectSearchRecipes } from '../../redux/search/search.selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    padding: '20px',
    gridGap: '40px',
    flexGrow: 1,
  }
}));

const RecipeList = ({ recipes }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      { recipes.length > 0 ?
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={3} key={recipes.indexOf(recipe)}>
            <RecipeCard key={recipe.id} recipeData={recipe} />
            </Grid>
        ))}
      </Grid>
      : <Typography>There are no recipes in the database matching your searched ingredients.</Typography>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: selectSearchRecipes(state)
});

export default connect(mapStateToProps)(RecipeList);
