import { SearchActionTypes } from './search.types';
import { firestore, convertRecipesSnapshotToMap } from '../../data/firebase/firebase.utils';
import { generateIngredientKeywords } from '../../data/data.utils';

export const fetchSearchQueryResults = (queryParams) => {
    return (dispatch) => {
      dispatch({
        type: SearchActionTypes.SEARCH_RECIPES_START
      });
  
      let data = [];  
      const parsedQueryParams = generateIngredientKeywords(queryParams.map(param => param.toLowerCase()));
      const recipeRef = firestore.collection('main-recipes');
  
      recipeRef.where('ingredKeywords', 'array-contains-any', parsedQueryParams)
      .get().then(
        snapshot => {
          const searchMap = convertRecipesSnapshotToMap(snapshot);
          dispatch({
            type: SearchActionTypes.SEARCH_RECIPES_SUCCESSFUL,
            payload: searchMap
          });}
        )
      .catch(err => dispatch({
        type: SearchActionTypes.SEARCH_RECIPES_FAILURE,
        payload: err
      }))
    }
  }

export const setSearchToOff = () => {
  return (dispatch) => dispatch({type: SearchActionTypes.SET_SEARCH_TO_OFF});
};