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
