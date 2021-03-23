import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header'
import RecipesPage from './pages/recipes-page/recipes-page';
import LogPage from './pages/log-page/log-page';
import HomePage from './pages/home-page/home-page';
import UserHistoryPage from './pages/user-history-page/user-history-page';
import { auth, createUserProfileDocument, addCookbookioDataToDB } from './firebase/firebase.utils';
import { postCookbookIORecipes } from './apis/recipes';
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
    // postCookbookIORecipes('https://www.allrecipes.com/recipe/261547/chorizo-breakfast-tacos-with-potato-hash-and-eggs/');
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
        <Route exact path='/signin' render={() => currentUser ? ( <Redirect to='/recipes' /> ) : ( <LogPage/> )}/>
        <Route exact path='/user-history' render={() => currentUser ? ( <UserHistoryPage/> ) : ( <Redirect to='/signin' /> )}/>
        {/* <Route exact path='/user-history' component={UserHistoryPage}/> */}
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
 