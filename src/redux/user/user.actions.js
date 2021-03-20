import { UserActionTypes } from './user.types';
import { addRecipeToUserHistory } from '../../firebase/firebase.utils';
import { selectCurrentUser } from './user.selectors';

const currUser = selectCurrentUser;

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

// export const addToUserHistory = (id, img, desc, recipeName) => {
//   return dispatch => {
//     addRecipeToUserHistory(currUser.id, id, img, desc, recipeName).then(() => {
//       dispatch({
//         type: UserActionTypes.ADD_TO_USER_HISTORY,
//         payload: currUser
//       })
//     })
//   }
// }