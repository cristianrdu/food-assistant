import { getAllRecipes, getRecipeComments, postCommentToRecipe, deleteComment } from '../../data/firebase/crud.utils';
import RecipeActionTypes from './recipe.types';

export const updateRecipesAsync = () => {
    return dispatch => {
        dispatch({ type: RecipeActionTypes.UPDATE_RECIPES_START });
        getAllRecipes().then( data =>{
            if(data instanceof Error) {
                dispatch({
                    type: RecipeActionTypes.UPDATE_RECIPES_FAILURE,
                    payload: data
                })
              } else {
                dispatch({
                    type: RecipeActionTypes.UPDATE_RECIPES_SUCCESSFUL,
                    payload: data
                })
              }
        })
    }
}

export const postComment = data => {
    return dispatch => {
        dispatch({ type: RecipeActionTypes.POST_COMMENT_START});
        postCommentToRecipe(data)
        .then(
            dispatch({ 
                type: RecipeActionTypes.POST_COMMENT_SUCCESSFUL, 
                payload: {data: {...data, createdAt: 'just now'}, id: ''}
            })
        )
        .catch(
            error => {
                console.log(error);
                dispatch({ 
                    type: RecipeActionTypes.POST_COMMENT_FAILURE,
                    payload: error
                })
            }
        )
    }
}

export const deleteRecipeComment = commentId => {
    return dispatch => {
        dispatch({ type: RecipeActionTypes.DELETE_COMMENT_START});
        deleteComment(commentId)
        .then(
            dispatch({ type: RecipeActionTypes.DELETE_COMMENT_SUCCESSFUL })
        )
        .catch(
            error => {
                console.log(error);
                dispatch({ 
                    type: RecipeActionTypes.DELETE_COMMENT_FAILURE,
                    payload: error
                })
            }
        )
    }
}

export const getComments = recipeId => {
    return dispatch => {
        dispatch({ type: RecipeActionTypes.GET_RECIPE_COMMENTS_START});
        getRecipeComments(recipeId)
        .then( data => {
            dispatch({ 
                type: RecipeActionTypes.GET_RECIPE_COMMENTS_SUCCESSFUL,
                payload: data
            })
        })
        .catch( error => {
            console.log(error);
            dispatch({
                type: RecipeActionTypes.GET_RECIPE_COMMENTS_FAILURE,
                payload: error
            })
        })
    }
}