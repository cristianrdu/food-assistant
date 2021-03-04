import React from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../../components/recipe-card/recipe-card';

import { selectRecipes } from '../../redux/recipe/recipe.selectors';

import './collection.css';

const CollectionPage = ({ recipes }) => {
  console.log(recipes[0].id)
  return (
    <div className='cards'>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipeData={recipe} />
        ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  recipes: selectRecipes(state)
});

export default connect(mapStateToProps)(CollectionPage);
