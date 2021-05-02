import SearchActionTypes from './search.types';

import searchReducer from './search.reducer';

describe('searchReducer', () => {
    const initiateSearchState = {
        searchRecipes: null,
        isUpdated: false,
        searchIsOn: false,
        errorMsg: undefined
      };

    
    it('should return the initial search reducer state', () => {
        expect(searchReducer(undefined, {})).toEqual(initiateSearchState)
    })
    
    it('should verify SEARCH_RECIPES_START action', () => {
        expect(searchReducer(initiateSearchState, {
            type: SearchActionTypes.SEARCH_RECIPES_START
        })).toEqual({
            ...initiateSearchState, 
            searchIsOn: true,
            isUpdated: false
        })
    })

    it('should verify SEARCH_RECIPES_SUCCESSFUL action', () => {
        expect(searchReducer(initiateSearchState, {
            type: SearchActionTypes.SEARCH_RECIPES_SUCCESSFUL,
            payload: 'testing data'
        })).toEqual({
            ...initiateSearchState, 
            isUpdated: true,
            searchRecipes: 'testing data'
        })
    })
    
    it('should verify SEARCH_RECIPES_FAILURE action', () => {
        expect(searchReducer(initiateSearchState, {
            type: SearchActionTypes.SEARCH_RECIPES_FAILURE,
            payload: 'error data'
        })).toEqual({
            ...initiateSearchState, 
            isUpdated: false,
            searchIsOn: false,
            errorMsg: 'error data'
        })
    })  
    it('should verify SET_SEARCH_TO_OFF action', () => {
        expect(searchReducer(initiateSearchState, {
            type: SearchActionTypes.SET_SEARCH_TO_OFF,
        })).toEqual({
            ...initiateSearchState, 
            searchIsOn: false,
            searchRecipes: []
        })
    })  
})