import { getAllRecipes } from '../../data/firebase/recipe.utils';
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
