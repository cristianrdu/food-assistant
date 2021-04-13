import { UserActionTypes } from './user.types';
import { generateMealPlan } from '../../data/firebase/firebase.utils';
import { sortRecipesByDay } from '../../data/data.utils';
import { postRecipeToUserHistory, updateMealPlan } from '../../data/firebase/users.utils';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const addToUserHistory = (historyData, recipeIngredients) => {
  return (dispatch, getState)=> {
    dispatch({
      type: UserActionTypes.ADD_USER_HISTORY_START
    })
    const {user} = getState();
    postRecipeToUserHistory(historyData, recipeIngredients, user.currentUser.id)
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
    generateMealPlan(days)
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
