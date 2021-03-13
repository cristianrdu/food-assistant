import RecipeActionTypes from './recipe.types';

import { firestore, convertRecipesSnapshotToMap} from '../../firebase/firebase.utils';

export const updateRecipes = recipesMap => ({
    type: RecipeActionTypes.UPDATE_RECIPES,
    payload: recipesMap
})

export const updateRecipesStart = () => ({
    type: RecipeActionTypes.UPDATE_RECIPES_START
})

export const updateRecipesSuccessful = recipesMap => ({
    type: RecipeActionTypes.UPDATE_RECIPES_SUCCESSFUL,
    payload: recipesMap
})

export const updateRecipesFailure = errorMsg => ({
    type: RecipeActionTypes.UPDATE_RECIPES_FAILURE,
    payload: errorMsg
})

export const updateRecipesStartAsync = () => {
    return dispatch => {

        const recipesRef = firestore.collection('main-recipes');
        dispatch(updateRecipesStart());

        recipesRef
        .get()
        .then(
            snapshot => {
                const recipesMap = convertRecipesSnapshotToMap(snapshot);
                dispatch(updateRecipesSuccessful(recipesMap));
            }
        )
        .catch(error => dispatch(updateRecipesFailure(error.message)));
    }
}