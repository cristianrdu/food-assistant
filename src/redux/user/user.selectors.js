/* eslint-disable no-sequences */
import { createSelector } from 'reselect';
import { collateFrequencyLists } from '../../data/recommender';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.id
);

export const selectMealPlan = createSelector(
  [selectCurrentUser],
  currentUser => currentUser ? currentUser.mealPlan : null
);

export const selectNrDaysMealPlan = createSelector(
  [selectMealPlan],
  mealPlan => mealPlan ? mealPlan.length : 0
);

export const selectMealPlanFetched = createSelector(
  [selectMealPlan],
  mealPlan => mealPlan && mealPlan.length > 0 ? true : false
);

export const selectCurrentUserHistory = createSelector(
  [selectCurrentUser],
  currentUser => currentUser ? currentUser.recipeHistory : null
);

export const selectIngredFrequencyList = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.ingredFrequencyList ? 
  currentUser.ingredFrequencyList
  .slice(0, 5)
  .filter(ingredFrequency => ingredFrequency.frequency !== 0)
  .reduce((acc, frequencyObject) => (acc.push(frequencyObject.ingredient), acc), [])
  : undefined
);

export const selectHistoryFrequencyList = createSelector(
  [selectCurrentUser],
  currentUser => currentUser && currentUser.recipeHistory ?  
  
  collateFrequencyLists(
    currentUser.recipeHistory
    .reduce((acc, userHistoryElement) => (acc.push(userHistoryElement.ingredFrequency), acc), [])
    )
  : undefined
);