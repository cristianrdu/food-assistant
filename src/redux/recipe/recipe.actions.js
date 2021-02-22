import RecipeActionTypes from './recipe.types';

export const updateRecipes = (recipesMap) => ({
    type: RecipeActionTypes.UPDATE_RECIPES,
    payload: recipesMap
})