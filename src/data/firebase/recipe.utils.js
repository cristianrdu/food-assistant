

import { firestore, convertRecipesSnapshotToMap } from './firebase.utils';
import { generateIngredientKeywords, addSearchKeywordsForRecipeCard} from '../data.utils';

export const searchRecipes = async (queryParams) => {
    const parsedQueryParams = generateIngredientKeywords(queryParams.map(param => param.toLowerCase()));
    const snapshot = await firestore.collection('main-recipes')
        .where('ingredKeywords', 'array-contains-any', parsedQueryParams)
        .get();
    const searchMap = convertRecipesSnapshotToMap(snapshot);
    return searchMap.map(
        searchRecipe => {
            const { id, recipe, routeCategory } = searchRecipe;
            const searchKeywords = addSearchKeywordsForRecipeCard(searchRecipe.recipe.ingred, parsedQueryParams);
            return {
                id,
                recipe,
                routeCategory,
                searchKeywords
            };
        }
    );
}