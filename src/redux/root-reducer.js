import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import recipeDataReducer from './recipe/recipe.reducer';
import directoryReducer from './directory/directory.reducer';


const rootReducer = combineReducers({
  user: userReducer,
  recipeData: recipeDataReducer,
  directory: directoryReducer
});

export default rootReducer;
