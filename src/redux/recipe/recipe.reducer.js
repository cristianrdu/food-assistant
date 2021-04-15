import RecipesActionTypes from './recipe.types';

const INITIAL_STATE = {
  recipes: null,
  isUpdating: false,
  comments: null,
  commentsLoading: true,
  errorMsg: undefined
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipesActionTypes.ADD_RECIPE_SUCCESSFUL:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case RecipesActionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      }
    case RecipesActionTypes.UPDATE_RECIPES_START:
      return {
        ...state,
        isUpdating: true
      }
    case RecipesActionTypes.UPDATE_RECIPES_SUCCESSFUL:
      return {
        ...state,
        isUpdating: false,
        recipes: action.payload
      }
    case RecipesActionTypes.UPDATE_RECIPES_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errorMsg: action.payload
      }
    case RecipesActionTypes.POST_COMMENT_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      }
    case RecipesActionTypes.GET_RECIPE_COMMENTS_START:
      return {
        ...state,
        commentsLoading: true
      }
    case RecipesActionTypes.GET_RECIPE_COMMENTS_SUCCESSFUL:
      return {
        ...state,
        commentsLoading: false,
        comments: action.payload
      }
    case RecipesActionTypes.GET_RECIPE_COMMENTS_FAILURE:
      return {
        ...state,
        commentsLoading: false,
        errorMsg: action.payload
      }
    case RecipesActionTypes.POST_COMMENT_SUCCESSFUL:
      return {
        ...state,
        commentsLoading: false,
        comments: [...state.comments, action.payload]
      }
    case RecipesActionTypes.DELETE_COMMENT_SUCCESSFUL:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      }
    default:
      return state;
  }
};

export default recipeDataReducer;
