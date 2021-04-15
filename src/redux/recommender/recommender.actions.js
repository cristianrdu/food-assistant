import { RecommenderActionTypes } from './recommender.types';
import { searchRecipes } from '../../data/crud.utils';

export const fetchAllTimeSearchResults = (queryParams) => {
  return (dispatch) => {
    dispatch({
      type: RecommenderActionTypes.ALL_TIME_SEARCH_START
    });

    if (queryParams.length > 0){
      searchRecipes(queryParams)
      .then((data) => {
        dispatch({
          type: RecommenderActionTypes.ALL_TIME_SEARCH_SUCCESSFUL,
          payload: data
        })
      })
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

    if (queryParams.length > 0){
      searchRecipes(queryParams)
      .then(data => {
        dispatch({
          type: RecommenderActionTypes.RECENTS_SEARCH_SUCCESSFUL,
          payload: data
        })
      })
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