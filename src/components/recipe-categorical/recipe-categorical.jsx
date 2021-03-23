import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectCategoricalRecipes } from '../../redux/recipe/recipe.selectors';

import './recipe-categorical.css';

const RecipeCategorical = ({ recipes, match }) => {
  return (
    <div>
      <h2 style={{justifyContent:'center', display:'flex'}}>{match.params.routeUrl} Recipes</h2>
      <div className='cards'>
          {recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />) )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  recipes: selectCategoricalRecipes(ownProps.match.params.routeUrl)(state)
});

export default connect(mapStateToProps)(RecipeCategorical);
