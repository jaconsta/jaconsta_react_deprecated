import React, { PropTypes } from 'react'

const PostResume = ({text}) => (
  <div>
    <h1> {title} </h1>
    <p> {text} </p>
  </div>
)

PostResume.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default PostResume