import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectRecipeComments } from '../../redux/recipe/recipe.selectors';
import { postComment, deleteRecipeComment } from '../../redux/recipe/recipe.actions';

import CommentSection from './comment-section';


const mapDispatchToProps = dispatch => ({
    postComment: (data) => dispatch(postComment(data, dispatch)),
    deleteRecipeComment: (id) => dispatch(deleteRecipeComment(id, dispatch))
});

const mapStateToProps = createStructuredSelector({ 
    comments: selectRecipeComments,
    currentUser: selectCurrentUser,
})

const CommentSectionContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CommentSection);

export default CommentSectionContainer;