import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header'
import RecipesPage from './pages/recipes-page/recipes-page';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import HomePage from './pages/home-page/home-page';
import { auth, createUserProfileDocument/*, addCookbookioDataToDB*/ } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

const App = ( {setCurrentUser, currentUser} ) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
    }, error => console.log("error: ",error));
    // addCookbookioDataToDB();
    // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/chicken-and-autumn-vegetable-pies/');
    return () => {
      unsubscribeFromAuth();
    };

  }, [setCurrentUser]);

  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/recipes' component={RecipesPage} />
        <Route exact path='/signin' render={() => currentUser ? ( <Redirect to='/recipes' /> ) : ( <SignInAndSignUpPage /> )}/>
      </Switch>
    </div>
  );
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
 