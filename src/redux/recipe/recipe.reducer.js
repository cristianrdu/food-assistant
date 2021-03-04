import RecipeActionTypes from './recipe.types';

const INITIAL_STATE = {
  recipes: null
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipeActionTypes.UPDATE_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    default:
      return state;
  }
};

export default recipeDataReducer;
