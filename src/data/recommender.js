// Ingredients marked with (*) may be omitted - normally not a main ingredient.
const mainIngredientList = [
    //Meats 
    'chicken',
    'beef',
    // 'ground beef',
    'turkey',
    'pork',
    'bacon',
    'pepperoni',
    'steak',
    'ham',
    'sausage',
    'lamb',
    //Seafoods
    'fish',
    'halibut',
    'bass',
    'trout',
    'salmon',
    'tuna',
    //Dairy & Eggs
    // 'eggs',
    'egg',
    'mozzarella',
    // 'milk', // *
    'cheese',
    'yogurt',
    //Vegetables
    'shallot',
    'pea',
    'onion',
    // 'garlic', // *
    'brussels sprout', 
    'broccoli',
    'tomato',
    'carrot',
    'cauliflower',
    'lettuce',
    'cucumber',
    'spinach',
    'mushroom',    
    'celery',
    // 'olive', // *
    'zucchini',
    // 'pepper', // *
    'radish',
    'cabbage',
    //Starches
    'corn',
    'beans',
    'potato',
    'grain',
    'bread',
    'cereal',
    'lentil',
    'rice',
    'pasta',
]

export const getEmptyFrequencyList = () => {
    let frequencyArray = [];
        
    mainIngredientList.forEach(ingredient =>  {
        frequencyArray.push({ingredient, frequency:0})
    });

    return frequencyArray;
}
// Parses through the recipeIngredients to update the frequencyArray;
export const parseRecipeIngredients = (recipesHistory) => {
    let frequencyArray = [];
        
    mainIngredientList.forEach(ingredient =>  {
        frequencyArray.push({ingredient, frequency:0})
    });

    // Iterates through the user's recipe history. 
    // The recipe history is an array of ingredients lists.   
    // Structure of the History Array:
    // recipeHistoryArray [ 
    //  Ingredient List [ 
    //      Ingredient String 
    //      ] 
    // ]
    recipesHistory.forEach(
        recipeIngredientList => 
            recipeIngredientList.forEach(
                recipeIngred => 
                    frequencyArray.forEach(
                        (frequencyObject) => {
                            if (recipeIngred.includes(frequencyObject.ingredient))
                                frequencyObject.frequency += 1;
                        }
                    )
                
            )
    )
    
    return frequencyArray
    .sort((a,b) => (a.frequency < b.frequency) ? 1 : -1) // Sorts the array by frequency
    .slice(0, 10) // Gets top ten ingredients in the frequencyArray
    .reduce((acc, frequencyObject) => (acc.push(frequencyObject.ingredient), acc), []); // Picks only the ingredient property values, leaving out the frequency property;
}

export const singleIngredListFrequency = (ingredientList, frequencyList) => {
    let alltimeFrequencyArray = frequencyList;
    let recentsFrequencyArray = getEmptyFrequencyList();

    ingredientList.forEach(
        recipeIngred => {
            alltimeFrequencyArray.forEach(
                (frequencyObject) => {
                    if (recipeIngred.includes(frequencyObject.ingredient))
                        frequencyObject.frequency += 1;
                }
            )
            recentsFrequencyArray.forEach(
                (frequencyObject) => {
                    if (recipeIngred.includes(frequencyObject.ingredient))
                        frequencyObject.frequency += 1;
                }
            )
        }
        
    )
    
    return {alltimeFrequencyArray: alltimeFrequencyArray.sort((a,b) => (a.frequency < b.frequency) ? 1 : -1),
        recentsFrequencyArray: recentsFrequencyArray}
}

export const collateFrequencyLists = (frequencyLists) => {
    let accumulatorList = getEmptyFrequencyList();
    let freqLists = frequencyLists.length < 3 ? frequencyLists : frequencyLists.slice(0,3)
    freqLists.forEach(list => {
        for(let j = 0; j < accumulatorList.length; j++){
            accumulatorList[j].frequency += list[j].frequency;
        }
    })
    
    // Slice controls how many ingredients to include in the returned list
    return accumulatorList
    .sort((a,b) => (a.frequency < b.frequency) ? 1 : -1)
    .filter(ingredFrequency => ingredFrequency.frequency !== 0)
    .reduce((acc, frequencyObject) => (acc.push(frequencyObject.ingredient), acc), [])
    .slice(0,3);
}