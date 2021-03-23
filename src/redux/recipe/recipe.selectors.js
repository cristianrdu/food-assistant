import { createSelector } from 'reselect';

const selectRecipeData = state => state.recipeData;

export const selectRecipes = createSelector(
  [selectRecipeData],
  recipeData => recipeData.recipes
);

export const selectCategoricalRecipes = routeUrl => createSelector(
  [selectRecipes],
  recipes => {
    if (routeUrl === 'all')
      {return recipes}
    else
    return recipes.filter(recipe => recipe.routeCategory === routeUrl)}
);

export const selectRecipeDetails = recipeId => createSelector(
  [selectRecipes],
  recipes => {return recipes.find(recipe => recipe.id === recipeId)}
);

export const selectIsRecipeUpdating = createSelector(
  [selectRecipeData],
  recipeData => recipeData.isUpdating
);

export const selectIsRecipeUpdated = createSelector(
  [selectRecipeData],
  recipeData => !!recipeData.recipes
);