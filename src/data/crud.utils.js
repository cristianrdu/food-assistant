import firebase from 'firebase/app';
import { firestore } from './firebase.utils';

import { singleIngredListFrequency, getEmptyFrequencyList } from './recommender';
import { generateIngredientKeywords, addSearchKeywordsForRecipeCard, sleep, dateFormat, convertRecipesSnapshotToMap } from './data.utils';

// Users

export const addUserToFirebase = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const creationDate = new Intl.DateTimeFormat("en-GB", dateFormat).format(new Date());
    const ingredFrequencyList = getEmptyFrequencyList();
    try {
      await userRef.set({
        displayName,
        email,
        creationDate,
        recipeHistory: [],
        likes: [],
        ratings: [],
        ingredFrequencyList,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }

  }

  return userRef;
};

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
  return searchMap
  .map(
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
  )
  .sort((a, b) => b.searchKeywords.length - a.searchKeywords.length);
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
// These two link resources contain the functions that were adapted to generate a random document Key in order to integrate the meal Plan
// https://firebase.google.com/docs/reference/js/firebase.firestore.FieldPath
// https://firebase.google.com/docs/reference/admin/node/admin.firestore.FieldPath
export const generateMealPlan = async (days) => {
  const mealTypes = ['dinner','lunch','breakfast'];
  const promises = [];
  const recipes = firestore.collection("main-recipes");
  let data = [];
  
  for(let i = 0; i < days; i++){
    mealTypes.forEach(mealType => {
      let promise = recipes
      .where('mealType','==', mealType)
      // verifies if there are any keys present AFTER the assigned doc().id key
      .where(firebase.firestore.FieldPath.documentId(), '>=', recipes.doc().id)
      .limit(1)
      .get()
      .then(snapshot => {
        // if the second 'where' condition is met and the database returns the snapshot containing one document, get the data.
        if(snapshot.size > 0) {
          snapshot.forEach(doc => {
            data.push({id: doc.id, recipe: doc.data()});
          });
          return;
          // else verify if there are any keys present BEFORE the assigned doc().id key
        } else {
          recipes
          .where('mealType','==', mealType)
          .where(firebase.firestore.FieldPath.documentId(), '<', recipes.doc().id)
          .limit(1)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              data.push({id: doc.id, recipe: doc.data()});
            });
            return;
          })
          .catch(error => {
            console.log(error);
          });
        }
        })
        .catch(error => {
          console.log(error);
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

export const addRecipes = async (collectionKey, recipesData) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  if(Array.isArray(recipesData)) {
    recipesData.forEach(data => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, data);
    });
  } else {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, recipesData);
  }

  return await batch.commit();
};

export const addCookbookioDataToDB = () => {
  const recipes = []
  var db = firestore.collection("cookbookio-recipes") 
  db
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach(
        (doc) => {
          const {name, description, images, ingredients, instructions, url, "cook-time": cookingTime, "prep-time": preppingTime} = doc.data();
          const parsedKeywords = generateIngredientKeywords(ingredients);
          recipes.push({
            source: url, 
            recipeName: name,
            mealType: 'breakfast',
            desc: description,
            img: images[0],
            ingred: ingredients,
            instruct: instructions[0].steps,
            cookTime: cookingTime,
            prepTime: preppingTime,
            ingredKeywords: parsedKeywords 
          });
      });
  })
  .then(() => {
    addRecipes('main-recipes', recipes);
  }
  )
  
  return recipes;
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
  const createdAt = new Intl.DateTimeFormat("en-GB", dateFormat).format(new Date());
  return firestore.collection('main-recipes').doc(data.recipeId).get()
  .then( doc => {
    if(!doc.exists){
      console.log({error: 'Recipe not found'});
      return 'err';
    }
    return firestore.collection('comments')
    .add({...data, createdAt})
    .then(docRef => {return docRef.id});
  })
  .catch( err => console.log(err));
};

export const getRecipeComments = async (recipeId) => {
  return firestore.collection('comments')
  .where('recipeId','==', recipeId)
  .get()
  .then( snapshot => {
    const comments = [];
    snapshot.forEach( doc => {
      comments.push({id: doc.id, data: doc.data()});});
    return comments;
  })
  .catch( error => {
    console.log(error);
    return error;
  })
};

export const getUserComments = async (userId) => {
  return firestore.collection('comments')
  .where('userId','==', userId)
  .get()
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