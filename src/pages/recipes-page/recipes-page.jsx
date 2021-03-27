import React,{useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { updateRecipesStartAsync } from '../../redux/recipe/recipe.actions';
import { selectIsRecipeUpdated } from '../../redux/recipe/recipe.selectors';

import RecipeCategorical from '../../components/recipe-categorical/recipe-categorical';
import RecipeDetails from '../../components/recipe-details/recipe-details';
import SpinningLoader from '../../components/loader/loader';

import './recipes-page.css';

const RecipeCategoricalLoader = SpinningLoader(RecipeCategorical);
const RecipeDetailsLoader = SpinningLoader(RecipeDetails);

const RecipesPage = ({updateRecipesStartAsync, match, isRecipeUpdated}) => {
  useEffect(() => {
    updateRecipesStartAsync();
}, [updateRecipesStartAsync])

  return (
    <div>
      <Route exact
        path={`${match.path}/:routeUrl`}
        render={(props) => <RecipeCategoricalLoader isLoading={!isRecipeUpdated} {...props} />}
      />
      <Route 
        path={`${match.url}/:routeUrl/:recipeId`}
        render={(props) => <RecipeDetailsLoader isLoading={!isRecipeUpdated} {...props} />}
      />
    </div>
  )

}

const mapStateToProps = createStructuredSelector({
  isRecipeUpdated: selectIsRecipeUpdated
});

const mapDispatchToProps = dispatch => ({
  updateRecipesStartAsync: () => dispatch(updateRecipesStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);

