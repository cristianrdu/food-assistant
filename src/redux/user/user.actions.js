import { UserActionTypes } from './user.types';
// import { addRecipeToUserHistory } from '../../firebase/firebase.utils';
import { firestore } from '../../firebase/firebase.utils';


export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const addToUserHistory = (id, img, desc, recipeName) => {
  return (dispatch,getState )=> {
    const {user} =getState();
    const userRef = firestore.collection("users").doc(user.currentUser.id);
    const addedAt = new Date();
    
    let historyData = []
    
    
    userRef.get()
    .then((doc) => {
        console.log(doc.exists);
        const userData = doc.data();
        historyData = userData.recipeHistory;
        historyData.push({addedAt, id, img, desc, recipeName});
        userRef.update({recipeHistory: historyData});
      })
    .then(() => {
      dispatch({
        type: UserActionTypes.ADD_USER_HISTORY_SUCCESSFUL
      })
    })
    .catch(error => console.log(error));
  }
}
