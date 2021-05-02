import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import './index.css';
import AppContainer from './App-container';

ReactDOM.render( 
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

