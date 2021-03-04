import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestore, convertRecipesSnapshotToMap } from '../../firebase/firebase.utils';
import { updateRecipes } from '../../redux/recipe/recipe.actions';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

export class HomePage extends Component {
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

    return (
      <div>
        <Route
          path={`${match.path}`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  updateRecipes: recipesMap => dispatch(updateRecipes(recipesMap))
})


export default connect(null, mapDispatchToProps)(HomePage);

