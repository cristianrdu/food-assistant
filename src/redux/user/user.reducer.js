import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  mealPlan: [],
  mealPlanFetched: false,
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
        mealPlanFetched: true
      };
    case UserActionTypes.SET_MEAL_PLAN_START:
      return {
        ...state,
        mealPlanFetched: false
      };
    case UserActionTypes.SET_MEAL_PLAN_FAIL:
      return {
        ...state,
        mealPlanFetched: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
