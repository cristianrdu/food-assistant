import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { auth } from './data/firebase.utils';
import { /*addCookbookioDataToDB ,*/ addUserToFirebase } from './data/crud.utils';
// import { postCookbookIORecipes } from './data/apis';

import Header from './components/header/header'
import RecipesPageContainer from './pages/recipes-page/recipes-page-container';
import SignInPage from './pages/sign-in-page/sign-in-page';
import SignUpPage from './pages/sign-up-page/sign-up-page';
import HomePage from './pages/home-page/home-page';
import UserHistoryPage from './pages/user-history-page/user-history-page';
import RecommenderPageContainer from './pages/recommender-page/recommender-page-container';
import AddRecipePage from './pages/add-recipe-page/add-recipe-page';

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
          <Route path='/recipes' component={RecipesPageContainer} />
          <Route exact path='/sign-in' render={() => currentUser ? ( <Redirect to='/' /> ) : ( <SignInPage/> )}/>
          <Route exact path='/sign-up' render={() => currentUser ? ( <Redirect to='/' /> ) : ( <SignUpPage/> )}/>
          <Route exact path='/add-new-recipe' render={() => currentUser ? ( <AddRecipePage/> ) : ( <Redirect to='/sign-in' /> )}/>
          <Route exact path='/recipe-history' render={() => currentUser ? ( <UserHistoryPage/> ) : ( <Redirect to='/sign-in' /> )}/>
          <Route exact path='/suggestions' render={() => currentUser ? ( <RecommenderPageContainer/> ) : ( <Redirect to='/sign-in' /> )}/>
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
 