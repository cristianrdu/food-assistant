import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertRecipesSnapshotToMap } from '../../firebase/firebase.utils';

import { updateRecipes } from '../../redux/recipe/recipe.actions';

import RecipeList from '../../components/recipe-list/recipe-list';
import RecipeCategorical from '../../components/recipe-categorical/recipe-categorical';

import WithSpinner from '../../components/with-spinner/with-spinner';

import './recipes-page.css';
const RecipeListWithSpinner = WithSpinner(RecipeList);
const RecipeCategoricalWithSpinner = WithSpinner(RecipeCategorical);
export class RecipesPage extends Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() { //retrieving recipe data from firestore
    const { updateRecipes } = this.props;
    const collectionRef = firestore.collection('main-recipes');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const recipesMap = convertRecipesSnapshotToMap(snapshot);
      // console.log(recipesMap)
      updateRecipes(recipesMap);
      this.setState({ loading: false });
    });
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    console.log(`${match.path}/:routeUrl`)
    return (
      <div>
        <Route exact
          path={`${match.path}`}
          render={(props) => <RecipeListWithSpinner isLoading={loading} {...props} />}
        />
        <Route 
          path={`${match.path}/:routeUrl`}
          render={(props) => <RecipeCategoricalWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  updateRecipes: recipesMap => dispatch(updateRecipes(recipesMap))
})


export default connect(null, mapDispatchToProps)(RecipesPage);

