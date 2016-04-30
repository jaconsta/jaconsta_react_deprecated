import React, { Component, PropTypes } from 'react';

import PostResume from './postResume'

export default class LatestsPost extends Component {
  render() { 
    const { posts } = this.props
    return (
      <div className="post-list">
        {posts.map( (post, i) => 
          <section key={i} className={"post-resume "+((i%2)===0?"pair":"unpair")}>
            <div className="container inner">
              <div className="content">
                <h2> {post.title.rendered} </h2> 
                <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </div>
            </div>
          </section>
          
        )}
      </div>
    )
  }
}

LatestsPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
}
