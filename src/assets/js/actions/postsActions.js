import fetch from 'isomorphic-fetch'

// Action types
export const READ_POST = 'READ_POST'
export const REQUEST_LATEST_POST = 'REQUEST_LATEST_POST'
export const LATEST_POST = 'LATEST_POST'
export const SHOW_POST = 'SHOW_POST'

// Action Creators
export function selectedPost(postId) {
  return {
    type: READ_POST,
    postType: postId
  }
}
export function requestLastestPosts(type) {
  return {
    type: REQUEST_LATEST_POST
  }
}

export function getLatestPost(postType, json) {
  return {
    type: LATEST_POST,
    postType,
    post: json,
    receivedAt: Date.now()
  }
}

// Async interactions
export function fetchPosts(postType) {
  return function (dispatch) {
    // Inform the API call started.
    dispatch(requestLastestPosts(postType))
  
    // Fetch posts
    return fetch('http://jaconsta.com/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(json => {
        // Update the state with the API call results.
        dispatch(getLatestPost(postType, json))
      })
      .catch(function(error) {
        console.log('request failed', error)
      })
  }
}