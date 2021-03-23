const INITIAL_STATE = {
  sections: [
    {
      title: 'Dinner',
      imageUrl: 'https://www.harmonsgrocery.com/wp-content/uploads/2020/09/Traditional_Turkey_Meal.jpg',
      id: 1,
      linkUrl: 'recipes/dinner'
    },
    {
      title: 'Lunch',
      imageUrl: 'https://thefoodmedic.co.uk/wp-content/uploads/2019/07/LBC.001.jpeg',
      id: 2,
      linkUrl: 'recipes/lunch'
    },
    {
      title: 'Breakfast',
      imageUrl: 'https://static.toiimg.com/photo/79876607.cms',
      id: 3,
      linkUrl: 'recipes/breakfast'
    },
    {
      title: 'Snacks & Dessert',
      imageUrl: 'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2019/07/spring-fruit-and-cream-tart-recipe-photo.jpg?fit=1200%2C879&ssl=1',
      id: 4,
      linkUrl: 'recipes/snacks+dessert'
    }
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
