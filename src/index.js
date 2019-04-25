import React from 'react';
import { render } from 'react-dom';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combinedReducer from './reducers'

// App
import App from './components/App';

const store = createStore(combinedReducer)

// DOM
let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'))
