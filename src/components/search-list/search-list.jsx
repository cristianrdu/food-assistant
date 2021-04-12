import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../recipe-card/recipe-card';

import { selectSearchRecipes } from '../../redux/search/search.selectors';

import './search-list.css';
import { Typography } from '@material-ui/core';

const RecipeList = ({ recipes }) => {
  return (
    <div className='cards'>
      { recipes.length > 0 ?
        recipes.map(recipe => (<RecipeCard key={recipe.id} recipeData={recipe} />))
        : <Typography>There are no recipes in the database matching your search.</Typography>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: selectSearchRecipes(state)
});

export default connect(mapStateToProps)(RecipeList);
