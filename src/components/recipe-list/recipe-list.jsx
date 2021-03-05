import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectRecipes } from '../../redux/recipe/recipe.selectors';

import './recipe-list.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className='cards'>
        {recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />) )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  recipes: selectRecipes(state)
});

export default connect(mapStateToProps)(RecipeList);
