import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectSearchRecipes } from '../../redux/search/search.selectors';

import './search-list.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className='cards'>
      {
        recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />))
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: selectSearchRecipes(state)
});

export default connect(mapStateToProps)(RecipeList);
