import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  mealPlan: [],
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SET_MEAL_PLAN_SUCCESS:
      return {
        ...state,
        mealPlan: action.payload,
      };
    case UserActionTypes.SET_MEAL_PLAN_START:
      return {
        ...state,
      };
    case UserActionTypes.SET_MEAL_PLAN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
