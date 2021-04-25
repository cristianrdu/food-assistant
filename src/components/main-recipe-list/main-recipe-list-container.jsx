import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';



import { selectCategoricalRecipes } from '../../redux/recipe/recipe.selectors';
import MainRecipeList from './main-recipe-list';


const mapStateToProps = createStructuredSelector({
  recipes: (state, ownProps) => selectCategoricalRecipes(ownProps.match.params.routeUrl)(state)
});


const MainRecipeListContainer = compose(
    connect(mapStateToProps),
)(MainRecipeList);

export default MainRecipeListContainer