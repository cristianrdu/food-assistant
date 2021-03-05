import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.meesage);
    }

  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

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
}

export const getCookbookioData = () => {
  const recipes = []
  var db = firestore.collection("cookbookio-recipes") 
  db.get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        const {name, description, images, ingredients, instructions, url, "cook-time": cookingTime} = doc.data();
        recipes.push({source: url, recipeName: name, mealType: 'dinner', desc: description, img: images[0], ingred: ingredients, instruct: instructions[0].steps, cookTime: cookingTime });
      });
  })
  // .then(() => {
  //   addCollectionAndDocuments("main-recipes", recipes);
  // }
  // )
  // console.log("Recipes: ", recipes);
  
  return recipes;
}

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;