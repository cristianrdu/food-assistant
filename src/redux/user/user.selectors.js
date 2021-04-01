import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.id
);

export const selectCurrentUserHistory = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser ? currentUser.recipeHistory : null
);

export const selectIngredFrequencyList = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser && currentUser.ingredFrequencyList ? 
  currentUser.ingredFrequencyList
  .slice(0, 5)
  .filter(ingredFrequency => ingredFrequency.frequency !== 0)
  .reduce((acc, frequencyObject) => (acc.push(frequencyObject.ingredient), acc), [])
  : null
)

export const selectHistoricalRecipeIds = createSelector(
  [selectCurrentUserHistory],
  (userHistory) => {return userHistory.reduce((acc, userHistoryElement) => (acc.push(userHistoryElement.id), acc), []);}
)