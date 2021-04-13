import { UserActionTypes } from './user.types';
import { firestore, getRandomRecipes, updateMealPlan } from '../../data/firebase/firebase.utils';
import { singleIngredListFrequency } from '../../data/recommender';
import { sortRecipesByDay, sleep } from '../../data/data.utils';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const addToUserHistory = (id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, ingred) => {
  return (dispatch, getState)=> {
    dispatch({
      type: UserActionTypes.ADD_USER_HISTORY_START
    })

    const {user} = getState();
    
    const addedAt = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date());

    let historyData = []        
    const userRef = firestore.collection("users").doc(user.currentUser.id);
    userRef.get()
    .then((doc) => {
        const userData = doc.data();
        historyData = userData.recipeHistory;
        const frequencyLists = singleIngredListFrequency(ingred, userData.ingredFrequencyList);
        
        historyData.unshift({id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, addedAt, ingredFrequency: frequencyLists.recentsFrequencyArray});
        userRef.update({recipeHistory: historyData, ingredFrequencyList: frequencyLists.alltimeFrequencyArray});
      })
    .then(() => {
      dispatch({
        type: UserActionTypes.ADD_USER_HISTORY_SUCCESSFUL
      })
    })
    .catch(error => {
      dispatch({
        type: UserActionTypes.ADD_USER_HISTORY_FAIL
      })  
      console.log(error)
    });
  }
};

export const setMealPlan = (days) => {
  return (dispatch, getState) => {
    dispatch({
      type: UserActionTypes.SET_MEAL_PLAN_START
    })
    const {user} = getState();
    getRandomRecipes(days)
    .then(data => {
      const mealData = sortRecipesByDay(data);
      updateMealPlan(user.currentUser.id, mealData);
      dispatch({
      type: UserActionTypes.SET_MEAL_PLAN_SUCCESS,
      payload: mealData
      })
    })
    .catch(error => {
      dispatch({
        type: UserActionTypes.SET_MEAL_PLAN_FAIL,
        payload: error
      })  
      console.log(error)
    })
    
  }
};
