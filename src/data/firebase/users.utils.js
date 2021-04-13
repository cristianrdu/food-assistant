import { firestore } from './firebase.utils';
import { singleIngredListFrequency } from '../recommender';

export const postRecipeToUserHistory = async (data, recipeIngredients, userId) => {

    const addedAt = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date());

    const userRef = firestore.collection("users").doc(userId)
    try {
        const doc = await userRef.get();
        const userData = doc.data();
        const historyData = userData.recipeHistory;
        const frequencyLists = singleIngredListFrequency(recipeIngredients, userData.ingredFrequencyList);
        historyData.unshift({ ...data, addedAt, ingredFrequency: frequencyLists.recentsFrequencyArray });
        userRef.update({ recipeHistory: historyData, ingredFrequencyList: frequencyLists.alltimeFrequencyArray });
    } catch (err) {
        console.log('ERROR:', err);
    }
};

export const updateMealPlan = (userId, mealPlan) => {
  const userRef = firestore.collection("users").doc(userId)
  userRef.update({ mealPlan })
  .catch(err => { console.log('ERR', err)});
};