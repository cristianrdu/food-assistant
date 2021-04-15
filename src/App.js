import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header'
import RecipesPage from './pages/recipes-page/recipes-page';
import SignInPage from './pages/sign-in-page/sign-in-page';
import SignUpPage from './pages/sign-up-page/sign-up-page';
import HomePage from './pages/home-page/home-page';
import UserHistoryPage from './pages/user-history-page/user-history-page';
import RecommenderPage from './pages/recommender-page/recommender-page';
import { auth } from './data/firebase.utils';
import { addCookbookioDataToDB, addUserToFirebase } from './data/crud.utils';
import { postCookbookIORecipes } from './data/apis';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from './components/material-ui/Theme';

const App = ( {setCurrentUser, currentUser} ) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await addUserToFirebase(userAuth);
  
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    }, error => console.log("error: ",error));
    // addCookbookioDataToDB();
    // postCookbookIORecipes('https://www.allrecipes.com/recipe/261547/chorizo-breakfast-tacos-with-potato-hash-and-eggs/');
    return () => {
      unsubscribeFromAuth();
    };

  }, [setCurrentUser]);

  return (
    <div>
      <ThemeProvider theme={createMuiTheme}>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/recipes' component={RecipesPage} />
          <Route exact path='/sign-in' render={() => currentUser ? ( <Redirect to='/recipes/all' /> ) : ( <SignInPage/> )}/>
          <Route exact path='/sign-up' render={() => currentUser ? ( <Redirect to='/recipes/all' /> ) : ( <SignUpPage/> )}/>
          <Route exact path='/recipe-history' render={() => currentUser ? ( <UserHistoryPage/> ) : ( <Redirect to='/recipes/all' /> )}/>
          <Route exact path='/suggestions' render={() => currentUser ? ( <RecommenderPage/> ) : ( <Redirect to='/recipes/all' /> )}/>
        </Switch>
      </ThemeProvider>
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
 