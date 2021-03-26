import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../data/firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.css';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/recipes/all'>
        RECIPES
      </Link>
      {currentUser ? 
      (<>
        <Link className='option' to='/user-history'>
          RECIPE HISTORY
        </Link>
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      </>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);