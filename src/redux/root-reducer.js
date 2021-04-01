import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import recipeDataReducer from './recipe/recipe.reducer';
import directoryReducer from './directory/directory.reducer';
import searchReducer from './search/search.reducer';
import recommenderReducer from './recommender/recommender.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  recipeData: recipeDataReducer,
  directory: directoryReducer,
  searchData: searchReducer,
  recommenderData: recommenderReducer
});

export default persistReducer(persistConfig, rootReducer);
