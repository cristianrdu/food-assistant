import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

it('expects to render the App component', () => {
    expect(shallow(<App />)).toMatchSnapshot()
})

 