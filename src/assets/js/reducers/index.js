import { combineReducers } from 'redux';
import { selectedPost, managePosts } from './postReducer'

const rootReducer = combineReducers({
    selectedPost,
    managePosts
});

export default rootReducer;
