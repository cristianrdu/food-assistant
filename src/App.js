import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument
  // , getCookbookioData, addCollectionAndDocuments
} from './firebase/firebase.utils';
// import { searchWebnoxRecipes, postCookbookIORecipes, postSpoonacularRecipes, getSpoonacularRecipes } from './apis/recipes';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import './App.css';
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
      // getCookbookioData();
      // postSpoonacularRecipes('https://www.allrecipes.com/recipe/8975/chicken-parmigiana/');
      // postSpoonacularRecipes('https://www.allrecipes.com/recipe/257938/spicy-thai-basil-chicken-pad-krapow-gai/');
      // postWebnoxRecipes('https://www.gordonramsay.com/gr/recipes/beef-meatball-sandwich-with-melting-mozzarella-and-tomato-salsa/');
      // getSpoonacularRecipes('pasta');
      // postYummlyRecipes();
      // searchWebnoxRecipes();
      // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/chicken-and-autumn-vegetable-pies/');
      // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/grilled-salmon-with-garlic-mushroom-and-lentil-salad/');
      // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/spring-green-wraps/');
      // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/macaroni-and-cauliflower-bake-with-three-cheeses/');
      // postCookbookIORecipes('https://www.gordonramsay.com/gr/recipes/mozzarella-and-rosemary-pizza/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/268091/easy-korean-ground-beef-bowl/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/16354/easy-meatloaf/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/23600/worlds-best-lasagna/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/219965/lighter-chicken-fettuccine-alfredo/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/158140/spaghetti-sauce-with-ground-beef/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/147305/scallops-mascarpone/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/238023/easy-classic-goulash/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/273255/italian-sausage-tortellini/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/51283/maple-salmon/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/93015/pan-fried-halibut-steak-with-light-green-sauce/');
      // postCookbookIORecipes('https://www.allrecipes.com/recipe/232906/simple-broiled-haddock/');
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            exact
            path='/signin'
            render={() => this.props.currentUser ? ( <Redirect to='/' /> ) :
             (
                  <SignInAndSignUpPage />
                )
            }
          />
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
 