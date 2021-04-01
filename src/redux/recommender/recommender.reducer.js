import RecommenderActionTypes from './recommender.types';

const INITIAL_STATE = {
  recommendedRecipes: null,
  isUpdated: false,
  errorMsg: undefined
};

const recommenderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecommenderActionTypes.RECOMMENDER_SEARCH_START:
      return {
        ...state,
        isUpdated: false
      }
    case RecommenderActionTypes.RECOMMENDER_SEARCH_SUCCESSFUL:
      return {
        ...state,
        isUpdated: true,
        recommendedRecipes: action.payload
      }
    case RecommenderActionTypes.RECOMMENDER_SEARCH_FAILURE:
      return {
        ...state,
        isUpdated: false,
        errorMsg: action.payload
      }
    default:
      return state;
  }
};

export default recommenderReducer;
