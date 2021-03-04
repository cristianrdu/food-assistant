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

export const selectRecipe = recipeUrlParam =>
  createSelector(
    [selectRecipes],
    recipes => (recipes ? recipes[recipeUrlParam] : null)
  );
