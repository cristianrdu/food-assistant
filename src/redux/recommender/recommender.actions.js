import { RecommenderActionTypes } from './recommender.types';
import { firestore, convertRecipesSnapshotToMap } from '../../data/firebase/firebase.utils';
import { generateIngredientKeywords, addSearchKeywordsForRecipeCard} from '../../data/data.utils';

export const fetchRecommenderQueryResults = (queryParams) => {
    return (dispatch) => {
      dispatch({
        type: RecommenderActionTypes.RECOMMENDER_SEARCH_START
      });
  
      const parsedQueryParams = generateIngredientKeywords(queryParams.map(param => param.toLowerCase()));
      const recipeRef = firestore.collection('main-recipes');
      // if parsedQueryParams
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
              type: RecommenderActionTypes.RECOMMENDER_SEARCH_SUCCESSFUL,
              payload: recommenderData
            });}
          )
        .catch(err => dispatch({
          type: RecommenderActionTypes.RECOMMENDER_SEARCH_FAILURE,
          payload: err
        }))
      } else {
        dispatch({
          type: RecommenderActionTypes.RECOMMENDER_SEARCH_SUCCESSFUL,
          payload: null
        });
      }
    }
  }
