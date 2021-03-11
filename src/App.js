import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header'
import RecipesPage from './pages/recipes-page/recipes-page';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/home-page/home-page';
import { auth, createUserProfileDocument/*, addCookbookioDataToDB, addCollectionAndDocuments*/ } from './firebase/firebase.utils';
// import { searchWebnoxRecipes, postCookbookIORecipes, postSpoonacularRecipes, getSpoonacularRecipes } from './apis/recipes';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;


  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
  
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
      // addCookbookioDataToDB();
      // postSpoonacularRecipes('https://www.allrecipes.com/recipe/8975/chicken-parmigiana/');
      // postSpoonacularRecipes('https://www.allrecipes.com/recipe/257938/spicy-thai-basil-chicken-pad-krapow-gai/');
      // postWebnoxRecipes('https://www.gordonramsay.com/gr/recipes/beef-meatball-sandwich-with-melting-mozzarella-and-tomato-salsa/');
      // getSpoonacularRecipes('pasta');
      // postYummlyRecipes();
      // searchWebnoxRecipes();
      // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/chicken-and-autumn-vegetable-pies/');
    }, error => console.log("error: ",error));
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/recipes' component={RecipesPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? ( <Redirect to='/recipes' /> ) : ( <SignInAndSignUpPage /> )}/>
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
 