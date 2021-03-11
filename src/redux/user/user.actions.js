import { UserActionTypes } from './user.types';
import { addRecipeToUserHistory } from '../../firebase/firebase.utils';
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

// export const addToUserHistory = (userId,recipeId) => dispatch => {
//   addRecipeToUserHistory(userId,recipeId).then(() => {
//     dispatch({
//       type: UserActionTypes.ADD_TO_USER_HISTORY,
//       payload: recipeId
//     })
//   })
// }