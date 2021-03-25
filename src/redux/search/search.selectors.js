import { createSelector } from 'reselect';

const selectSearchData = state => state.searchData;

export const selectSearchRecipes = createSelector(
  [selectSearchData],
  searchData => searchData.searchRecipes
);

export const selectSearchIsOn = createSelector(
  [selectSearchData],
  searchData => searchData.searchIsOn
);

export const selectIsUpdating = createSelector(
  [selectSearchData],
  searchData => searchData.isUpdated
);