import { createSelector } from 'reselect';

const selectRecommenderData = state => state.recommenderData;

export const selectRecommendedRecipes = createSelector(
  [selectRecommenderData],
  recommenderData => recommenderData.recommendedRecipes
);

export const selectIsUpdated = createSelector(
  [selectRecommenderData],
  recommenderData => recommenderData.isUpdated
);