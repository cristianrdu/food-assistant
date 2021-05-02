import { UserActionTypes } from './user.types';

import userReducer from './user.reducer';

describe('userReducer', () => {
    const initiateUserState = {
        currentUser: null,
        mealPlan: [],
        error: null
      };

    const initiateMealPlan = {
        day1: 'test', 
        day2: 'test', 
        day3: 'test'
    };
    
    it('should return the initial user reducer state', () => {
        expect(userReducer(undefined, {})).toEqual(initiateUserState)
    })
    
    it('should verify SET_CURRENT_USER action', () => {
        expect(userReducer(initiateUserState, {
            type: UserActionTypes.SET_CURRENT_USER,
            payload: 'test'
        })).toEqual({...initiateUserState, currentUser: 'test'})
    })

    it('should verify SET_MEAL_PLAN_SUCCESS action', () => {
        expect(userReducer(initiateUserState, {
            type: UserActionTypes.SET_MEAL_PLAN_SUCCESS,
            payload: initiateMealPlan
        })).toEqual({...initiateUserState, mealPlan: initiateMealPlan})
    })

    it('should verify SET_MEAL_PLAN_FAIL action', () => {
        expect(userReducer(initiateUserState, {
            type: UserActionTypes.SET_MEAL_PLAN_FAIL,
            payload: 'Error testing'
        })).toEqual({...initiateUserState, error: 'Error testing'})
    })
    
    
})