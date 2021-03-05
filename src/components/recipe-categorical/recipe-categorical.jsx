import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectCategoricalRecipes } from '../../redux/recipe/recipe.selectors';

import './recipe-categorical.css';

const RecipeCategorical = ({ recipes }) => {
  return (
    <div className='cards'>
        {recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />) )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  recipes: selectCategoricalRecipes(ownProps.match.params.routeUrl)(state)
});

export default connect(mapStateToProps)(RecipeCategorical);
