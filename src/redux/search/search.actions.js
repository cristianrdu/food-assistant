import { SearchActionTypes } from './search.types';
import { searchRecipes } from '../../data/firebase/crud.utils';

export const fetchSearchQueryResults = (queryParams) => {
  return (dispatch) => {
    dispatch({
      type: SearchActionTypes.SEARCH_RECIPES_START
    });
    searchRecipes(queryParams)
    .then((data) => {
      dispatch({
        type: SearchActionTypes.SEARCH_RECIPES_SUCCESSFUL,
        payload: data
      })
    })
    .catch(err => dispatch({
      type: SearchActionTypes.SEARCH_RECIPES_FAILURE,
      payload: err
    }))
  }
  }

export const setSearchToOff = () => ({type: SearchActionTypes.SET_SEARCH_TO_OFF});