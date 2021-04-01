import { UserActionTypes } from './user.types';
import { firestore } from '../../data/firebase/firebase.utils';
import { singleIngredListFrequency } from '../../data/recommender';
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const addToUserHistory = (id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, ingred) => {
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
        const updatedFrequencyList = singleIngredListFrequency(ingred, userData.ingredFrequencyList);
        
        historyData.unshift({id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, addedAt});
        userRef.update({recipeHistory: historyData, ingredFrequencyList: updatedFrequencyList});
      })
    .then(() => {
      dispatch({
        type: UserActionTypes.ADD_USER_HISTORY_SUCCESSFUL
      })
    })
    .catch(error => console.log(error));
  }
}
