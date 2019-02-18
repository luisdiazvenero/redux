import React from 'react';
import { hydrate } from 'react-dom';
import Home from '../pages/containers/home';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers/index';
import { Map as map} from 'immutable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// function logger({getState, dispatch}) {
//   return(next) => {
//     return (action) => {
//       console.log('este es mi viejo estado', getState().toJS())
//       console.log('vamos a enviar esta accion', action);
//       const value = next(action)
//       console.log('este es mi nuevo estado', getState().toJS())
//       return value
//     }
//   }
// }

// const logger = ({ getState, dispatch }) => next => action => {
//   console.log('este es mi viejo estado', getState().toJS())
//   console.log('vamos a enviar esta accion', action);
//   const value = next(action)
//   console.log('este es mi nuevo estado', getState().toJS())
//   return value
// }

const store = createStore(
  reducer,
  map(),
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunk
    )
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// console.log(store.getState())

const homeContainer = document.getElementById('home-container')

// ReactDOM.render(que voy a renderizar, donde lo haré);
// const holaMundo = <h1>hola Estudiante!</h1>;

hydrate(
  <Provider store={store}>
    <Home />
  </Provider>
  , homeContainer);
