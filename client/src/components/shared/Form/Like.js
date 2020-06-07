import React from 'react'
import { connect } from 'react-redux'

import { createLike, removeLike } from '../../../redux/actions/post'

class Like extends React.Component {

  onLikeClick = (e) => {
    e.preventDefault()
    const { auth, postId, likes, TYPE } = this.props
    
    if (auth.isAuthenticated) {
      const existedLike = likes.find((l) => l.user === auth.user.id)
      if (existedLike) {
        this.props.removeLike(postId, existedLike._id, TYPE)
      } else {
        this.props.createLike(postId, TYPE)
      }
    }
  }

  render() {
    const { likes  } = this.props
    return (
      <a
        href="#"
        role="button"
        className="card-link"
        onClick={this.onLikeClick}
      >
        <i className="fa fa-thumbs-up"></i> {likes.length}
      </a>
    );
  }
}


const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { createLike, removeLike })(Like)
