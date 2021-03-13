import RecipeActionTypes from './recipe.types';

const INITIAL_STATE = {
  recipes: null,
  isUpdating: false,
  errorMsg: undefined
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipeActionTypes.UPDATE_RECIPES_START:
      return {
        ...state,
        isUpdating: true
      }
    case RecipeActionTypes.UPDATE_RECIPES_SUCCESSFUL:
      return {
        ...state,
        isUpdating: false,
        recipes: action.payload
      }
    case RecipeActionTypes.UPDATE_RECIPES_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errorMsg: action.payload
      }

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
