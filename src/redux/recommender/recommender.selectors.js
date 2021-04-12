import { createSelector } from 'reselect';

const selectRecommenderData = state => state.recommenderData;

export const selectAllTimeRecommendedRecipes = createSelector(
  [selectRecommenderData],
  recommenderData => recommenderData.allTimeRecommendedRecipes
);

export const selectRecentsRecommendedRecipes = createSelector(
  [selectRecommenderData],
  recommenderData => recommenderData.recentsRecommendedRecipes
);

export const selectAllTimeUpdated = createSelector(
  [selectRecommenderData],
  recommenderData => recommenderData.allTimeUpdated
);

export const selectRecentsUpdated = createSelector(
  [selectRecommenderData],
  recommenderData => recommenderData.recentsUpdated
);