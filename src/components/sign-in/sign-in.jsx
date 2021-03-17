import React, {useState } from 'react';

import FormInput from '../form-input/form-input';
import CustomButton from '../material-ui/custom-button';

import { auth } from '../../firebase/firebase.utils';


import './sign-in.css';

const SignIn = () => {
  const [userCredentials, setCredentials ] = useState({email: '', password: ''})
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ email: '', password: '' });
    } catch (error) {
      alert(error.message);
    } 
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({...userCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          // required
        />
        <FormInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='password'
          // required
        />
        <CustomButton type='submit' > Sign in </CustomButton>
      </form>
    </div>
  );
}

export default SignIn;
