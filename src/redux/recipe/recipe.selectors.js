import { createSelector } from 'reselect';

const selectRecipeData = state => state.recipeData;

export const selectRecipes = createSelector(
  [selectRecipeData],
  recipeData => recipeData.recipes
);

export const selectRecipesForPreview = createSelector(
  [selectRecipes],
  recipes => recipes ? Object.keys(recipes).map(key => recipes[key]) : []
);

export const selectCategoricalRecipes = routeUrl => createSelector(
    [selectRecipes],
    recipes => {return recipes.filter(recipe => recipe.routeCategory === routeUrl)}
  );

export const selectRecipeDetails = recipeId => createSelector(
  [selectRecipes],
  recipes => {return recipes.find(recipe => recipe.id === recipeId)}
)