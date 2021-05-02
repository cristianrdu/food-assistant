import { shallow } from 'enzyme';
import React from 'react';
import MainRecipeList from './main-recipe-list';


it('expects to render the MainRecipeList component', () => {
    expect(shallow(<MainRecipeList recipes={[]} match={{params: {routeUrl: test}}} />)).toMatchSnapshot()
})

 