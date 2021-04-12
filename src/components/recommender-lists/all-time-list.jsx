import React from 'react';
import { connect } from 'react-redux';

import { selectAllTimeRecommendedRecipes } from '../../redux/recommender/recommender.selectors';

import RecipeCard from '../recipe-card/recipe-card';

import { Typography } from '@material-ui/core';

const AllTimeList = ({ recipes }) => {
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
  recipes: selectAllTimeRecommendedRecipes(state)
});

export default connect(mapStateToProps)(AllTimeList);
