import { shallow } from 'enzyme';
import React from 'react';
import RecipeDetails from './recipe-details';

it('expects to render the MainRecipeList component', () => {
    expect(shallow(<RecipeDetails />)).toMatchSnapshot()
})

 