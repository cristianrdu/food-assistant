import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { updateRecipesStartAsync } from '../../redux/recipe/recipe.actions';
import { selectIsRecipeUpdating } from '../../redux/recipe/recipe.selectors';

// import { firestore, convertRecipesSnapshotToMap } from '../../firebase/firebase.utils';

import RecipeList from '../../components/recipe-list/recipe-list';
import RecipeCategorical from '../../components/recipe-categorical/recipe-categorical';
import RecipeDetails from '../../components/recipe-details/recipe-details';
import WithSpinner from '../../components/with-spinner/with-spinner';

import './recipes-page.css';
const RecipeListWithSpinner = WithSpinner(RecipeList);
const RecipeCategoricalWithSpinner = WithSpinner(RecipeCategorical);
const RecipeDetailsWithSpinner = WithSpinner(RecipeDetails);
export class RecipesPage extends Component {

  componentDidMount() { //retrieving recipe data from firestore
    const { updateRecipesStartAsync } = this.props;
    updateRecipesStartAsync();
  }
  render() {
    const { match, isRecipeUpdating } = this.props;

    return (
      <div>
        <Route exact
          path={`${match.path}`}
          render={(props) => <RecipeListWithSpinner isLoading={isRecipeUpdating} {...props} />}
        />
        <Route 
          path={`${match.path}/:routeUrl`}
          render={(props) => <RecipeCategoricalWithSpinner isLoading={isRecipeUpdating} {...props} />}
        />
        <Route 
          path={`${match.path}/single/:recipeId`}
          render={(props) => <RecipeDetailsWithSpinner isLoading={isRecipeUpdating} {...props} />}
        />
      </div>
    )

  }
}
 
const mapStateToProps = createStructuredSelector({
  isRecipeUpdating: selectIsRecipeUpdating 
});
const mapDispatchToProps = dispatch => ({
  updateRecipesStartAsync: () => dispatch(updateRecipesStartAsync())
});


export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);

