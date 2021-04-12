import React from 'react';
import { connect } from 'react-redux';

import { selectRecentsRecommendedRecipes } from '../../redux/recommender/recommender.selectors';

import RecipeCard from '../recipe-card/recipe-card';

import { Typography } from '@material-ui/core';

const RecentsList = ({ recipes }) => {
  return (
    <div className='cards'>
      { recipes !== null ?
        recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />))
        : <Typography>You need to add recipes to history first.</Typography>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: selectRecentsRecommendedRecipes(state)
});

export default connect(mapStateToProps)(RecentsList);
