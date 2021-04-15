import RecipesActionTypes from './recipe.types';
import RecipeActionTypes from './recipe.types';

const INITIAL_STATE = {
  recipes: null,
  isUpdating: false,
  comments: null,
  commentsLoading: true,
  errorMsg: undefined
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipeActionTypes.UPDATE_RECIPES_START:
      return {
        ...state,
        isUpdating: true
      }
    case RecipeActionTypes.UPDATE_RECIPES_SUCCESSFUL:
      return {
        ...state,
        isUpdating: false,
        recipes: action.payload
      }
    case RecipeActionTypes.UPDATE_RECIPES_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errorMsg: action.payload
      }
    case RecipeActionTypes.POST_COMMENT_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      }
    case RecipeActionTypes.GET_RECIPE_COMMENTS_START:
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
    case RecipeActionTypes.POST_COMMENT_SUCCESSFUL:
      return {
        ...state,
        commentsLoading: false,
        comments: [...state.comments, action.payload]
      }
    case RecipeActionTypes.DELETE_COMMENT_SUCCESSFUL:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      }
    default:
      return state;
  }
};

export default recipeDataReducer;
