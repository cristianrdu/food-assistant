import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {sleep, generateIngredientKeywords} from '../data.utils';

const config = {
  apiKey: "AIzaSyC9T4PSJUWlYgrYwoRFcq-PInwUTCdUNEU",
  authDomain: "food-assistant-29fb3.firebaseapp.com",
  projectId: "food-assistant-29fb3",
  storageBucket: "food-assistant-29fb3.appspot.com",
  messagingSenderId: "867041977186",
  appId: "1:867041977186:web:a8dcfea1e10f6b319f823b",
  measurementId: "G-6P66BPCN8L"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const creationDate = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        creationDate,
        recipeHistory: [],
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }

  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  if(Array.isArray(objectsToAdd))
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  else {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, objectsToAdd);
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
    addCollectionAndDocuments("main-recipes", recipes);
  }
  )
  console.log("Recipes: ", recipes);
  
  return recipes;
};

export const convertRecipesSnapshotToMap = (recipes) => {
  return recipes.docs.map(doc => {
    const recipe = doc.data();
    return {
      routeName: encodeURI(recipe.recipeName.toLowerCase()),
      routeCategory: recipe.mealType,
      id: doc.id,
      recipe
    };
  });
};

export const addRecipeToUserHistory = async (userId, recipeId, img, desc, recipeName) => {
  const addedAt = new Date();
  const userRef = firestore.collection("users").doc(userId);
  let historyData = []
  userRef.get().then(
    (doc) => {
      const userData = doc.data();
      historyData = userData.recipeHistory;
      historyData.unshift({addedAt, recipeId, img, desc, recipeName});
      userRef.update({
        recipeHistory: historyData
      })
    })
};

export const fetchSearchQueryResults = async (queryParams) => {

  let data = [];

  const parsedQueryParams = generateIngredientKeywords(queryParams.map(param => param.toLowerCase()));
  
  const recipeRef = firestore.collection('main-recipes');

  recipeRef.where('ingredKeywords', 'array-contains-any', parsedQueryParams).get().then(
    (doc) => {
      doc.forEach( obj => {    
        data.unshift(obj.data());    
      })
    }).catch(err => console.log("ERROR: ",err.message))
    
    await sleep();   
    
    return data;
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;