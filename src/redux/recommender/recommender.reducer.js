import RecommenderActionTypes from './recommender.types';

const INITIAL_STATE = {
  allTimeRecommendedRecipes: null,
  recentsRecommendedRecipes: null,
  allTimeUpdated: false,
  recentsUpdated: false,
  errorMsg: undefined
};

const recommenderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecommenderActionTypes.ALL_TIME_SEARCH_START:
      return {
        ...state,
        allTimeUpdated: false
      }
    case RecommenderActionTypes.ALL_TIME_SEARCH_SUCCESSFUL:
      return {
        ...state,
        allTimeUpdated: true,
        allTimeRecommendedRecipes: action.payload
      }
    case RecommenderActionTypes.ALL_TIME_SEARCH_FAILURE:
      return {
        ...state,
        allTimeUpdated: true,
        errorMsg: action.payload
      }
    case RecommenderActionTypes.RECENTS_SEARCH_START:
      return {
        ...state,
        recentsUpdated: false
      }
    case RecommenderActionTypes.RECENTS_SEARCH_SUCCESSFUL:
      return {
        ...state,
        recentsUpdated: true,
        recentsRecommendedRecipes: action.payload
      }
    case RecommenderActionTypes.RECENTS_SEARCH_FAILURE:
      return {
        ...state,
        recentsUpdated: true,
        errorMsg: action.payload
      }
    default:
      return state;
  }
};

export default recommenderReducer;
