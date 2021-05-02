import RecipesActionTypes from './recipe.types';

import recipeDataReducer from './recipe.reducer';

describe('userReducer', () => {
    const initiateRecipeDataState = {
        recipes: null,
        isUpdating: false,
        comments: null,
        commentsLoading: true,
        errorMsg: undefined
      };

    
    it('should return the initial recipe data reducer state', () => {
        expect(recipeDataReducer(undefined, {})).toEqual(initiateRecipeDataState)
    })
    
    it('should verify ADD_RECIPE_SUCCESSFUL action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.ADD_RECIPE_SUCCESSFUL,
            payload: 'add recipe test data'
        })).toEqual({
            ...initiateRecipeDataState, 
            recipes: ['add recipe test data']
        })
    })
    
    it('should verify ADD_RECIPE_FAILURE action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.ADD_RECIPE_FAILURE,
            payload: 'add recipe error data'
        })).toEqual({
            ...initiateRecipeDataState, 
            errorMsg: 'add recipe error data'
        })
    })
    
    it('should verify UPDATE_RECIPES_START action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.UPDATE_RECIPES_START
        })).toEqual({
            ...initiateRecipeDataState, 
            isUpdating: true
        })
    })
    
    it('should verify UPDATE_RECIPES_SUCCESSFUL action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.UPDATE_RECIPES_SUCCESSFUL,
            payload: 'update recipes test data'
        })).toEqual({
            ...initiateRecipeDataState, 
            isUpdating: false,
            recipes: 'update recipes test data'
        })
    })
    
    it('should verify UPDATE_RECIPES_FAILURE action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.UPDATE_RECIPES_FAILURE,
            payload: 'update recipes error data'
        })).toEqual({
            ...initiateRecipeDataState, 
            isUpdating: false,
            errorMsg: 'update recipes error data'
        })
    })
    
    it('should verify POST_COMMENT_FAILURE action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.POST_COMMENT_FAILURE,
            payload: 'post comment error data'
        })).toEqual({
            ...initiateRecipeDataState, 
            errorMsg: 'post comment error data'
        })
    })

    it('should verify POST_COMMENT_SUCCESSFUL action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.POST_COMMENT_SUCCESSFUL,
            payload: 'post comment test data'
        })).toEqual({
            ...initiateRecipeDataState, 
            commentsLoading: false,
            comments: ['post comment test data']
        })
    })
    
    it('should verify GET_RECIPE_COMMENTS_START action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.GET_RECIPE_COMMENTS_START,
        })).toEqual({
            ...initiateRecipeDataState, 
            commentsLoading: true
        })
    })
    
    it('should verify GET_RECIPE_COMMENTS_SUCCESSFUL action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.GET_RECIPE_COMMENTS_SUCCESSFUL,
            payload: 'get comments test data'
        })).toEqual({
            ...initiateRecipeDataState, 
            commentsLoading: false,
            comments: 'get comments test data'
        })
    })
    
    it('should verify GET_RECIPE_COMMENTS_FAILURE action', () => {
        expect(recipeDataReducer(initiateRecipeDataState, {
            type: RecipesActionTypes.GET_RECIPE_COMMENTS_FAILURE,
            payload: 'get comments error data'
        })).toEqual({
            ...initiateRecipeDataState, 
            commentsLoading: false,
            errorMsg: 'get comments error data'
        })
    })    
})