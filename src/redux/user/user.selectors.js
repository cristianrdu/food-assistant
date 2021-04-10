import { createSelector } from 'reselect';

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
  currentUser => currentUser ? currentUser.mealPlan : []
);

export const selectNrDaysMealPlan = createSelector(
  [selectMealPlan],
  mealPlan => mealPlan ? mealPlan.length : 0
);

export const selectMealPlanFetched = createSelector(
  [selectCurrentUser],
  currentUser => currentUser ? currentUser.mealPlanFetched : false
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
  : null
);

export const selectHistoricalRecipeIds = createSelector(
  [selectCurrentUserHistory],
  userHistory => {return userHistory.reduce((acc, userHistoryElement) => (acc.push(userHistoryElement.id), acc), []);}
);