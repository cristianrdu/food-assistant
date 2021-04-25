import { compose } from 'redux';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { updateRecipesAsync } from '../../redux/recipe/recipe.actions';
import { selectIsRecipeUpdated } from '../../redux/recipe/recipe.selectors';

import RecipesPage from './recipes-page';



const mapStateToProps = createStructuredSelector({
    isRecipeUpdated: selectIsRecipeUpdated
  });
  
  const mapDispatchToProps = dispatch => ({
    updateRecipesAsync: () => dispatch(updateRecipesAsync())
  });
const RecipesPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(RecipesPage);

export default RecipesPageContainer;