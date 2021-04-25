import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCommentsLoading, selectRecipeDetails } from '../../redux/recipe/recipe.selectors';
import { getComments } from '../../redux/recipe/recipe.actions';
import { addToUserHistory } from '../../redux/user/user.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';


import RecipeDetails from './recipe-details';

const mapStateToProps = createStructuredSelector({ 
  recipeData: (state, ownProps) => selectRecipeDetails(ownProps.match.params.recipeId)(state),
  currentUser: selectCurrentUser,
  commentsLoading: selectCommentsLoading
})

const mapDispatchToProps = dispatch => ({
  addToUserHistory: (historyData, ingred) => dispatch(addToUserHistory(historyData, ingred, dispatch)),
  getComments: (recipeId) => dispatch(getComments(recipeId, dispatch)),
});

const RecipeDetailsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(RecipeDetails);

export default RecipeDetailsContainer;