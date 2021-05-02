import { RecommenderActionTypes } from './recommender.types';

import recommenderReducer from './recommender.reducer';

describe('recommenderReducer', () => {
    const initiateRecommenderState = {
        allTimeRecommendedRecipes: null,
        recentsRecommendedRecipes: null,
        allTimeUpdated: false,
        recentsUpdated: false,
        errorMsg: undefined
      };

    
    it('should return the initial recommender reducer state', () => {
        expect(recommenderReducer(undefined, {})).toEqual(initiateRecommenderState)
    })
    
    it('should verify ALL_TIME_SEARCH_START action', () => {
        expect(recommenderReducer(initiateRecommenderState, {
            type: RecommenderActionTypes.ALL_TIME_SEARCH_START
        })).toEqual({
            ...initiateRecommenderState, 
            allTimeUpdated: false
        })
    })

    it('should verify ALL_TIME_SEARCH_SUCCESSFUL action', () => {
        expect(recommenderReducer(initiateRecommenderState, {
            type: RecommenderActionTypes.ALL_TIME_SEARCH_SUCCESSFUL,
            payload: 'all time search test data'
        })).toEqual({
            ...initiateRecommenderState, 
            allTimeUpdated: true,
            allTimeRecommendedRecipes: 'all time search test data'
        })
    })

    it('should verify ALL_TIME_SEARCH_FAILURE action', () => {
        expect(recommenderReducer(initiateRecommenderState, {
            type: RecommenderActionTypes.ALL_TIME_SEARCH_FAILURE,
            payload: 'all time search error data'
        })).toEqual({
            ...initiateRecommenderState, 
            allTimeUpdated: true,
            errorMsg: 'all time search error data'
        })
    })

    it('should verify RECENTS_SEARCH_START action', () => {
        expect(recommenderReducer(initiateRecommenderState, {
            type: RecommenderActionTypes.RECENTS_SEARCH_START,
        })).toEqual({
            ...initiateRecommenderState, 
            recentsUpdated: false
        })
    })

    it('should verify RECENTS_SEARCH_SUCCESSFUL action', () => {
        expect(recommenderReducer(initiateRecommenderState, {
            type: RecommenderActionTypes.RECENTS_SEARCH_SUCCESSFUL,
            payload: 'recents search test data'
        })).toEqual({
            ...initiateRecommenderState, 
            recentsUpdated: true,
            recentsRecommendedRecipes: 'recents search test data'
        })
    })

    it('should verify RECENTS_SEARCH_FAILURE action', () => {
        expect(recommenderReducer(initiateRecommenderState, {
            type: RecommenderActionTypes.RECENTS_SEARCH_SUCCESSFUL,
            payload: 'recents search error data'
        })).toEqual({
            ...initiateRecommenderState, 
            recentsUpdated: true,
            recentsRecommendedRecipes: 'recents search error data'
        })
    })
})