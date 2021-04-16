import { getAllRecipes, getRecipeComments, postCommentToRecipe, deleteComment, addRecipes } from '../../data/crud.utils';
import { generateIngredientKeywords } from '../../data/data.utils';
import RecipesActionTypes from './recipe.types';

export const updateRecipesAsync = () => {
    return dispatch => {
        dispatch({ type: RecipesActionTypes.UPDATE_RECIPES_START });
        getAllRecipes().then( data =>{
            if(data instanceof Error) {
                dispatch({
                    type: RecipesActionTypes.UPDATE_RECIPES_FAILURE,
                    payload: data
                })
              } else {
                dispatch({
                    type: RecipesActionTypes.UPDATE_RECIPES_SUCCESSFUL,
                    payload: data
                })
              }
        })
    }
}

export const addRecipe = data => {
    return (dispatch, getState) => {
        dispatch({type: RecipesActionTypes.ADD_RECIPE_START});
        const { user } = getState();
        const ingredKeywords = generateIngredientKeywords(data.ingred)
        const recipe = {
            ...data, 
            user: {
                    id: user.currentUser.id, 
                    name: user.currentUser.displayName
                },
            ingredKeywords};
        addRecipes('main-recipes', recipe)
        .then(
            dispatch({
                type: RecipesActionTypes.ADD_RECIPE_SUCCESSFUL,
                payload: recipe
            })
        )
        .catch( error => {
            dispatch({
                type: RecipesActionTypes.ADD_RECIPE_FAILURE,
                payload: error
            })
        })
    }
}

export const postComment = data => {
    return dispatch => {
        dispatch({ type: RecipesActionTypes.POST_COMMENT_START});
        postCommentToRecipe(data)
        .then( id => {
            dispatch({ 
                type: RecipesActionTypes.POST_COMMENT_SUCCESSFUL, 
                payload: {data: {...data, createdAt: 'just now'}, id}
            })
        })
        .catch(
            error => {
                console.log(error);
                dispatch({ 
                    type: RecipesActionTypes.POST_COMMENT_FAILURE,
                    payload: error
                })
            }
        )
    }
}

export const deleteRecipeComment = commentId => {
    return dispatch => {
        dispatch({ type: RecipesActionTypes.DELETE_COMMENT_START});
        deleteComment(commentId)
        .then(
            dispatch({ 
                type: RecipesActionTypes.DELETE_COMMENT_SUCCESSFUL,
                payload: commentId
            })
        )
        .catch(
            error => {
                console.log(error);
                dispatch({ 
                    type: RecipesActionTypes.DELETE_COMMENT_FAILURE,
                    payload: error
                })
            }
        )
    }
}

export const getComments = recipeId => {
    return dispatch => {
        dispatch({ type: RecipesActionTypes.GET_RECIPE_COMMENTS_START});
        getRecipeComments(recipeId)
        .then( data => {
            dispatch({ 
                type: RecipesActionTypes.GET_RECIPE_COMMENTS_SUCCESSFUL,
                payload: data
            })
        })
        .catch( error => {
            console.log(error);
            dispatch({
                type: RecipesActionTypes.GET_RECIPE_COMMENTS_FAILURE,
                payload: error
            })
        })
    }
}