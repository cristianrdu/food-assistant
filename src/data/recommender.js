// Ingredients marked with (*) may be omitted - normally not a main ingredient.
const mainIngredientList = [
    //Meats
    'eggs', 
    'chicken',
    'beef',
    // 'ground beef', // 1 word ingredients are better for algorithm
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
    'eggs',
    'egg',
    'mozzarella',
    // 'milk', // *
    'cheese',
    'yogurt',
    //Vegetables
    'shallot',
    'pea',
    'onion',
    // 'garlic',
    // 'brussels sprout', // 1 word ingredients are better for algorithm
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
    'pepper',
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

// let frequencyArray = [];
    
// mainIngredientList.forEach(ingredient =>  {
//     frequencyArray.push({ingredient, frequency:0})
// });

// frequencyArray.forEach((freqElements) => {
//     if(freqElements.ingredient === 'pepper')
//         {
//             freqElements.frequency += 5;
//         }
//     if(freqElements.ingredient === 'cabbage')
//         {
//             freqElements.frequency += 4;
//         }
//     if(freqElements.ingredient === 'corn')
//         {
//             freqElements.frequency += 2;
//         }
// })
// frequencyArray.sort((a,b) => (a.frequency < b.frequency) ? 1 : -1)

// console.log(frequencyArray.slice(0,10).reduce((acc, frequencyObject) => (acc.push(frequencyObject.ingredient), acc), []));


// Parses through the recipeIngredients to update the frequencyArray;
const parseRecipeIngredients = (recipesHistory) => {
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


