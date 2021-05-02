import { shallow } from 'enzyme';
import React from 'react';
import CommentSection from './comment-section';

const mockComments = [{
    data:{
        createdAt:'test',  
        content: 'test',
        recipeId: 'test', 
        userName: 'test', 
        userId: 'test' 
    },
    id: 'test'
}]

it('expects to render the CommentSection component', () => {
    expect(shallow(<CommentSection comments={mockComments}/>)).toMatchSnapshot()
})

 