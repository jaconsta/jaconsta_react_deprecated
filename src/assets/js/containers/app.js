import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LatestsPost from '../components/latestPosts'


class AsyncPost extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }


  handleRefreshClick(e){
    e.preventDefault()
  }

  render() { 
    const { posts } = this.props
    return (
      <div className="">
        { !posts &&
            <p>Loading...</p>
        }
        { posts && posts.length > 0 &&
          <LatestsPost 
            posts={posts} />
        }
      </div>
    )
  }
}

AsyncPost.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

// Props to inject to the global state
function mapStateToProps(state) {
  const { managePosts } = state
  const { items: posts } = managePosts.blog || { items : [] }
  return {
    posts
  }
}

// Wrap the component and inject dispatch and state into it
export default connect(mapStateToProps)(AsyncPost)
