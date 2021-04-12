import { RecommenderActionTypes } from './recommender.types';
import { firestore, convertRecipesSnapshotToMap } from '../../data/firebase/firebase.utils';
import { generateIngredientKeywords, addSearchKeywordsForRecipeCard} from '../../data/data.utils';

export const fetchAllTimeSearchResults = (queryParams) => {
  return (dispatch) => {
    dispatch({
      type: RecommenderActionTypes.ALL_TIME_SEARCH_START
    });

    const parsedQueryParams = generateIngredientKeywords(queryParams.map(param => param.toLowerCase()));
    const recipeRef = firestore.collection('main-recipes');
    
    if (parsedQueryParams.length > 0){
      recipeRef
      .where('ingredKeywords', 'array-contains-any', parsedQueryParams)
      .get().then(
        snapshot => {
          const recommenderMap = convertRecipesSnapshotToMap(snapshot);
          const recommenderData = recommenderMap.map(
            recommenderRecipe => {
              const { id, recipe, routeCategory } = recommenderRecipe;
              const searchKeywords = addSearchKeywordsForRecipeCard(recommenderRecipe.recipe.ingred, parsedQueryParams);
              return {
                id,
                recipe,
                routeCategory,
                searchKeywords
              }
            }
          );
          dispatch({
            type: RecommenderActionTypes.ALL_TIME_SEARCH_SUCCESSFUL,
            payload: recommenderData
          });}
        )
      .catch(err => dispatch({
        type: RecommenderActionTypes.ALL_TIME_SEARCH_FAILURE,
        payload: err
      }))
    } else {
      dispatch({
        type: RecommenderActionTypes.ALL_TIME_SEARCH_SUCCESSFUL,
        payload: null
      });
    }
  }
};

export const fetchRecentsSearchResults = (queryParams) => {
  return (dispatch) => {
    dispatch({
      type: RecommenderActionTypes.RECENTS_SEARCH_START
    });

    const parsedQueryParams = generateIngredientKeywords(queryParams.map(param => param.toLowerCase()));
    const recipeRef = firestore.collection('main-recipes');

    if (parsedQueryParams.length > 0){
      recipeRef
      .where('ingredKeywords', 'array-contains-any', parsedQueryParams)
      .get().then(
        snapshot => {
          const recommenderMap = convertRecipesSnapshotToMap(snapshot);
          const recommenderData = recommenderMap.map(
            recommenderRecipe => {
              const { id, recipe, routeCategory } = recommenderRecipe;
              const searchKeywords = addSearchKeywordsForRecipeCard(recommenderRecipe.recipe.ingred, parsedQueryParams);
              return {
                id,
                recipe,
                routeCategory,
                searchKeywords
              }
            }
          );
          dispatch({
            type: RecommenderActionTypes.RECENTS_SEARCH_SUCCESSFUL,
            payload: recommenderData
          });}
        )
      .catch(err => dispatch({
        type: RecommenderActionTypes.RECENTS_SEARCH_FAILURE,
        payload: err
      }))
    } else {
      dispatch({
        type: RecommenderActionTypes.RECENTS_SEARCH_SUCCESSFUL,
        payload: null
      });
    }
  }
};