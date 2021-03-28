import { UserActionTypes } from './user.types';
import { firestore } from '../../data/firebase/firebase.utils';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const addToUserHistory = (id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes) => {
  // console.log('test:',id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes);
  return (dispatch, getState)=> {
    const {user} = getState();
    
    const addedAt = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date());

    let historyData = []        
    const userRef = firestore.collection("users").doc(user.currentUser.id);
    userRef.get()
    .then((doc) => {
        const userData = doc.data();
        historyData = userData.recipeHistory;
        historyData.unshift({id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, addedAt});
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
