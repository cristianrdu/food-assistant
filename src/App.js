import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
    // User subscription configured through the adaption of code and followed steps from Firestore documentation:
    // https://firebase.google.com/docs/auth/web/manage-users
    const userSubstriction = auth.onAuthStateChanged(async userToken => {
      if (userToken) {
        const userRef = await addUserToFirebase(userToken);
  
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userToken);
      }
    }, error => console.log("error: ",error));
    // These function calls are used to populate the database with recipe data.
    // addCookbookioDataToDB();
    // postCookbookIORecipes('https://www.allrecipes.com/recipe/261547/chorizo-breakfast-tacos-with-potato-hash-and-eggs/');
    return () => {
      userSubstriction();
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

export default App;
 