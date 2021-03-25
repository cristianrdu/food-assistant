import SearchActionTypes from './search.types';

const INITIAL_STATE = {
  searchRecipes: null,
  isUpdated: false,
  searchIsOn: false,
  errorMsg: undefined
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_RECIPES_START:
      return {
        ...state,
        searchIsOn: true,
        isUpdated: false
      }
    case SearchActionTypes.SEARCH_RECIPES_SUCCESSFUL:
      return {
        ...state,
        isUpdated: true,
        searchRecipes: action.payload
      }
    case SearchActionTypes.SEARCH_RECIPES_FAILURE:
      return {
        ...state,
        searchIsOn: false,
        isUpdated: false,
        errorMsg: action.payload
      }
    case SearchActionTypes.SET_SEARCH_TO_OFF:
      return {
        ...state,
        searchIsOn: false,
        searchRecipes: []
      }
    default:
      return state;
  }
};

export default searchReducer;
