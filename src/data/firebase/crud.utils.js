import firebase from 'firebase/app';
import { firestore, convertRecipesSnapshotToMap } from './firebase.utils';
import { singleIngredListFrequency } from '../recommender';
import { generateIngredientKeywords, addSearchKeywordsForRecipeCard, sleep} from '../data.utils';

export const postRecipeToUserHistory = async (data, recipeIngredients, userId) => {

    const addedAt = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date());

    const userRef = firestore.collection("users").doc(userId)
    try {
        const doc = await userRef.get();
        const userData = doc.data();
        const historyData = userData.recipeHistory;
        const frequencyLists = singleIngredListFrequency(recipeIngredients, userData.ingredFrequencyList);
        historyData.unshift({ ...data, addedAt, ingredFrequency: frequencyLists.recentsFrequencyArray });
        userRef.update({ recipeHistory: historyData, ingredFrequencyList: frequencyLists.alltimeFrequencyArray });
    } catch (err) {
        console.log('ERROR:', err);
    }
};

export const updateMealPlan = (userId, mealPlan) => {
  const userRef = firestore.collection("users").doc(userId)
  userRef.update({ mealPlan })
  .catch(err => { console.log('ERR', err)});
};

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
};

export const getAllRecipes = async () => {
  try {
    const snapshot = await firestore.collection('main-recipes')
      .get();
    return convertRecipesSnapshotToMap(snapshot);
  } catch (error) {
    return error;
  }
};

export const generateMealPlan = async (days) => {
  const mealTypes = ['dinner','lunch','breakfast'];
  const promises = [];
  const recipes = firestore.collection("main-recipes");
  let data = [];
  
  for(let i = 0; i < days; i++){
    mealTypes.forEach(mealType => {
      let key = recipes.doc().id;
      let promise = recipes
      .where('mealType','==', mealType)
      .where(firebase.firestore.FieldPath.documentId(), '>=', key).limit(1).get()
      .then(snapshot => {
        if(snapshot.size > 0) {
          snapshot.forEach(doc => {
            data.push({id: doc.id, recipe: doc.data()});
          });
          return;
        } else {
          recipes
          .where('mealType','==', mealType)
          .where(firebase.firestore.FieldPath.documentId(), '<', key).limit(1).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              data.push({id: doc.id, recipe: doc.data()});
            });
            return;
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
        }
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
        promises.push(promise)
      })
      
  }

  await sleep();

  return Promise.all(promises).then(() => {
    return data;
  })
  .catch(err => {
    console.log(err);
  })
};