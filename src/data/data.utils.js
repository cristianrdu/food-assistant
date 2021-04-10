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
    switch(recipes[i].mealType){
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
  
  for(let i = 0; i < breakfast.length; i++) {
    data.push({breakfast: breakfast[i],lunch: lunch[i],dinner: dinner[i]})
  }

  return data;
}