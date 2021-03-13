import { UserActionTypes } from './user.types';
import { addRecipeToUserHistory } from '../../firebase/firebase.utils';
import { selectCurrentUser } from './user.selectors';

const currUser = selectCurrentUser;
console.log(currUser)
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const addToUserHistory = (recipeId) => {
  return dispatch => {
    addRecipeToUserHistory(currUser.id,recipeId).then(() => {
      dispatch({
        type: UserActionTypes.ADD_TO_USER_HISTORY,
        payload: currUser
      })
    })
  }
}