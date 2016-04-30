import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from  'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import * as ReacDom from 'react-dom'

import AsyncPost from './containers/app.js'
import rootReducer from './reducers'

import { selectedPost, fetchPosts } from './actions/postsActions'
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

store.dispatch(selectedPost('blog'))
store.dispatch(fetchPosts('blog'))

let rootElement = document.getElementById('reduxroot');
render (
    <Provider store={store}>
      <AsyncPost />
    </Provider>, rootElement
)