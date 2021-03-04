import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import recipeDataReducer from './recipe/recipe.reducer';


const rootReducer = combineReducers({
  user: userReducer,
  recipeData: recipeDataReducer
});

export default rootReducer;
