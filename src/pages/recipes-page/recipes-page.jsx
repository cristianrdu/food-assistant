import React,{useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { updateRecipesAsync } from '../../redux/recipe/recipe.actions';
import { selectIsRecipeUpdated } from '../../redux/recipe/recipe.selectors';

import MainRecipeList from '../../components/main-recipe-list/main-recipe-list';
import RecipeDetails from '../../components/recipe-details/recipe-details';
import SpinningLoader from '../../components/loader/loader';

const MainRecipeListLoader = SpinningLoader(MainRecipeList);
const RecipeDetailsLoader = SpinningLoader(RecipeDetails);

const RecipesPage = ({updateRecipesAsync, match, isRecipeUpdated}) => {
  useEffect(() => {
    updateRecipesAsync();
}, [updateRecipesAsync])

  return (
    <div>
      <Route exact
        path={`${match.path}/:routeUrl`}
        render={(props) => <MainRecipeListLoader isLoading={!isRecipeUpdated} {...props} />}
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
  updateRecipesAsync: () => dispatch(updateRecipesAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);

