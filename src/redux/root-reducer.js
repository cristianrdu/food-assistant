import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import recipeDataReducer from './recipe/recipe.reducer';
import directoryReducer from './directory/directory.reducer';
import searchReducer from './search/search.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  recipeData: recipeDataReducer,
  directory: directoryReducer,
  searchData: searchReducer
});

export default persistReducer(persistConfig, rootReducer);
