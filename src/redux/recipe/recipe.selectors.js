import { createSelector } from 'reselect';

const selectRecipe = state => state.recipe;

export const selectRecipes = createSelector(
  [selectRecipe],
  shop => shop.recipes
);

export const selectRecipesForPreview = createSelector(
  [selectRecipes],
  recipes => recipes ? Object.keys(recipes).map(key => recipes[key]) : []
);

export const selectCollection = recipeUrlParam =>
  createSelector(
    [selectRecipes],
    recipes => (recipes ? recipes[recipeUrlParam] : null)
  );
