import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectRecommendedRecipes } from '../../redux/recommender/recommender.selectors';

const RecommenderList = ({ recipes }) => {
  return (
    <div className='cards'>
      {
        recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />))
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: selectRecommendedRecipes(state)
});

export default connect(mapStateToProps)(RecommenderList);
