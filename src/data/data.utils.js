export const generateIngredientKeywords = (ingredients) => {
    let keywords = [];
    
    ingredients.forEach(ingredient =>{
        keywords = keywords.concat(ingredient.split(' ').filter(isNaN));
    })
    
    return keywords;
}
export const sleep = (delay = 1000) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

export const addSearchKeywordsForRecipeCard = (ingredList, queryIngredients) => {
  const ingredString = ingredList.join();
  let searchKeywords = []
  queryIngredients.forEach(
    queryIngred => {
      if (ingredString.includes(queryIngred))
        searchKeywords.push(queryIngred);
    }
  )
  return searchKeywords;
}

export const sortRecipesByDay = (recipes) => {
  const breakfast = [];
  const lunch = [];
  const dinner = [];
  const data = [];

  for(let i = 0; i < recipes.length; i++) {
    switch(recipes[i].recipe.mealType){
      case 'breakfast':
        breakfast.push(recipes[i]);
        break;
      case 'lunch':
        lunch.push(recipes[i]);
        break;
      case 'dinner':
        dinner.push(recipes[i]);
        break;
      default:
        break;
    }
  }
  
  for(let i = 0; i < recipes.length / 3; i++) {
    let breakfastData = {};
    let lunchData = {};
    let dinnerData = {};
    if(breakfast[i] !== undefined)
      breakfastData = breakfast[i]
    if(lunch[i] !== undefined)
      lunchData = lunch[i]
    if(dinner[i] !== undefined)
      dinnerData = dinner[i]
    data.push({breakfast: breakfastData, lunch: lunchData, dinner: dinnerData, day: i + 1})
  }

  return data;
}

export const dateFormat = {
  hour: "numeric",
  minute: "numeric",
  year: "numeric",
  month: "long",
  day: "2-digit"
}

export const convertRecipesSnapshotToMap = (recipes) => {
  return recipes.docs.map(doc => {
    const recipe = doc.data();
    return {
      routeCategory: recipe.mealType,
      id: doc.id,
      recipe
    };
  });
};

// https://stackoverflow.com/questions/61550004/check-if-string-contains-any-letter-javascript-jquery
export const processTimers = (timer) => {
  const letterRegExp = /[a-zA-Z]/g;

  if(letterRegExp.test(timer)) {
    const minuteIdx = timer.indexOf('M')
    const hours = timer.includes('H') ? `0${timer[timer.indexOf('H') - 1]}` : '00'
    return `${hours}:${timer[minuteIdx - 2]}${timer[minuteIdx - 1]}`;
  } 
  
  return timer;

}