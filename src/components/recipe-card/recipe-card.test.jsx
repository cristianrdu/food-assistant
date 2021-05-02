import { shallow } from 'enzyme';
import React from 'react';
import  RecipeCard from './recipe-card';

it('expects to render the Recipe Card component', () => {
    const mockMatch = '/';
    const mockData = {id:'test',recipe: {img:'alt', recipeName: 'test', mealType: 'dinner'}, searchKeyword: undefined}
    expect(shallow(<RecipeCard match = {mockMatch} recipeData = { mockData }/>)).toMatchSnapshot()
})