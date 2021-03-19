import React from 'react';

import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import './log-page.css';

const LogPage = () => (
  <div className='log-page'>
    <SignIn />
    <SignUp />
  </div>
);

export default LogPage;
