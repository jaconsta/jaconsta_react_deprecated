import { combineReducers } from 'redux'
import { READ_POST, REQUEST_LATEST_POST, LATEST_POST, SHOW_POST } from '../actions/postsActions'

export function selectedPost(state = '', action){
  switch (action.type) {
    case READ_POST:
      return action.postType
    default:
      return state
  }
}

export function posts(state={
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_LATEST_POST:
      return Object.assign({}, state,{
        isFetching: true
      })
    case LATEST_POST:
      return Object.assign({}, state, {
        isFetching: true,
        items: action.post
      })
    default:
      return state
  }
}

export function managePosts(state={}, action) {
  switch (action.type) {
    case LATEST_POST:
    case REQUEST_LATEST_POST:
      return Object.assign({}, state, {
        [action.postType]: posts(state[action.postType], action)
      })
    default:
      return state
  }
}