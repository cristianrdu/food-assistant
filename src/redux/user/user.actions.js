import { UserActionTypes } from './user.types';
import { sortRecipesByDay } from '../../data/data.utils';
import { postRecipeToUserHistory, updateMealPlan, generateMealPlan, getUserComments } from '../../data/crud.utils';

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

export const getComments = () => {
  return (dispatch, getState) => {
      const {user} = getState();
      dispatch({ type: UserActionTypes.GET_USER_COMMENTS_START});
      getUserComments(user.currentUser.id)
      .then( data => {
          dispatch({ 
              type: UserActionTypes.GET_USER_COMMENTS_SUCCESSFUL,
              payload: data
          })
      })
      .catch( error => {
          console.log(error);
          dispatch({
              type: UserActionTypes.GET_USER_COMMENTS_FAILURE,
              payload: error
          })
      })
  }
}