import React,{useEffect} from 'react';
import { Route } from 'react-router-dom';

import MainRecipeListContainer from '../../components/main-recipe-list/main-recipe-list-container';
import RecipeDetailsContainer from '../../components/recipe-details/recipe-details-container';
import SpinningLoader from '../../components/loader/loader';

const MainRecipeListLoader = SpinningLoader(MainRecipeListContainer);
const RecipeDetailsLoader = SpinningLoader(RecipeDetailsContainer);

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

export default RecipesPage;

