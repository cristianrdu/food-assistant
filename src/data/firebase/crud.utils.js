import firebase from 'firebase/app';
import { firestore, convertRecipesSnapshotToMap } from './firebase.utils';
import { singleIngredListFrequency } from '../recommender';
import { generateIngredientKeywords, addSearchKeywordsForRecipeCard, sleep, dateFormat } from '../data.utils';

// Users

export const postRecipeToUserHistory = async (data, recipeIngredients, userId) => {

    const addedAt = new Intl.DateTimeFormat("en-GB", dateFormat).format(new Date());

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

// Recipes

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

export const likeRecipe = async (recipeId, userId) => {
  const likedAt = new Intl.DateTimeFormat("en-GB", dateFormat).format(new Date());

  const userRef = firestore.collection("users").doc(userId)
  try {
      const doc = await userRef.get();
      const userData = doc.data();
      const userLikes = userData.likes;
      userRef.update({ likes: [...userLikes, { recipeId, likedAt }]});
  } catch (err) {
      console.log('ERROR:', err);
  }

  const recipeRef = firestore.collection("recipes").doc(recipeId)
  try {
      const doc = await recipeRef.get();
      const recipeData = doc.data();
      recipeRef.update({ likeCount: recipeData.likeCount ? recipeData.likeCount + 1 : 1});
  } catch (err) {
      console.log('ERROR:', err);
  }
};

export const rateRecipe = async (recipeId, userId, rating) => {
  const ratedAt = new Intl.DateTimeFormat("en-GB", dateFormat).format(new Date());

  const userRef = firestore.collection("users").doc(userId)
  try {
      const doc = await userRef.get();
      const userData = doc.data();
      const userRatings = userData.ratings;
      userRef.update({ ratings: [...userRatings, { recipeId, ratedAt }]});
  } catch (err) {
      console.log('ERROR:', err);
  }

  const recipeRef = firestore.collection("recipes").doc(recipeId)
  try {
      const doc = await recipeRef.get();
      const recData = doc.data();
      recipeRef.update({ 
        averageRating: recData.averageRating ? 
        (recData.averageRating * recData.ratings + rating) / recData.ratings + 1 : rating, 
        ratings: recData.ratings ?
        recData.ratings + 1 : 1
      });
  } catch (err) {
      console.log('ERROR:', err);
  }
};

// Comments

export const postCommentToRecipe = async (data) => {
  const addedAt = new Intl.DateTimeFormat("en-GB", dateFormat).format(new Date());

  return firestore.collection('recipes').doc(data.recipeId).get()
  .then( doc => {
    if(!doc.exists){
      console.log({error: 'Recipe not found'});
    }
    return firestore.collection('comments')
    .add({...data, addedAt});
  })
  .catch( err => console.log(err));
};

export const getRecipeComments = async (recipeId) => {
  return firestore.collection('comments')
  .get()
  .where('recipeId','==', recipeId)
  .then( snapshot => {
    snapshot.forEach( doc => { return doc.data();});
  })
  .catch( error => {
    console.log(error);
    return error;
  })
};

export const getUserComments = async (userId) => {
  return firestore.collection('comments')
  .get()
  .where('userId','==', userId)
  .then( snapshot => {
    snapshot.forEach( doc => { return doc.data();});
  })
  .catch( error => {
    console.log(error);
    return error;
  })
};

export const deleteComment = async (commentId) => {
  return firestore.collection('comments').doc(commentId)
  .delete()
  .catch(error => {
    console.log(error);
    return error;
  })
};