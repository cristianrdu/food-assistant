import React from 'react';
import { connect } from 'react-redux';

import { selectAllTimeRecommendedRecipes } from '../../redux/recommender/recommender.selectors';

import RecipeCard from '../recipe-card/recipe-card';

import { Grid, Typography } from '@material-ui/core/'

const AllTimeList = ({ recipes }) => {
  return (
    <div className='cards'>
      { recipes !== null ?
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
          {recipes.map(recipe => (
            <Grid item xs={12} sm={6} md={4} key={recipes.indexOf(recipe)}>
              <RecipeCard key={recipe.id} recipeData={recipe} />
            </Grid>
          ))}
        </Grid>
      : <Typography>You need to add recipes to history first.</Typography>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: selectAllTimeRecommendedRecipes(state)
});

export default connect(mapStateToProps)(AllTimeList);
