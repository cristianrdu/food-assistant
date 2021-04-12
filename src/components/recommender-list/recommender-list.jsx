import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectRecommendedRecipes } from '../../redux/recommender/recommender.selectors';
import { Typography } from '@material-ui/core';

const RecommenderList = ({ recipes }) => {
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
  recipes: selectRecommendedRecipes(state)
});

export default connect(mapStateToProps)(RecommenderList);
