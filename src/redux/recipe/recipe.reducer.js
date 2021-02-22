// import SHOP_DATA from './shop.data';

import RecipeActionTypes from './recipe.types';

const INITIAL_STATE = {
  recipes: null
};

const recipeReducer = (state = INITIAL_STATE, action) => {
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

export default recipeReducer;
