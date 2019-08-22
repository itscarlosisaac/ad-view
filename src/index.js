import React from 'react';
import { render } from 'react-dom';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import combinedReducer from './reducers'
import thunk from "redux-thunk";


// App
import App from './components/App';
import '../electron/registerShortcuts';
import ViewManager from './ViewManager';

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk)
)

// DOM
let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <Provider store={store}>
    <ViewManager/>
  </Provider>,
document.getElementById('root'))
