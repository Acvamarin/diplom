import React from './node_modules/react'
import { connect } from './node_modules/react-redux'
import { getById as getPostById } from '../../redux/actions/post'

import Loading from '../shared/Loading'
import Post from '../shared/Form'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { UPDATE_FORM } from '../../redux/actions/consts'

class SinglePost extends React.Component {

  componentDidMount() {
    this.props.getPostById(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.post.isLoading && nextProps.post.post === null) {
      this.props.history.push('/404')
    }
  }

  render() {
    const { auth, post } = this.props
    return !post.isLoading && post.post !== null ? (
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <Post post={post.post} TYPE={UPDATE_FORM} />
          <div className="col-md-12 mx-auto">
            {auth.isAuthenticated && <CommentForm postId={post.post._id} />}
            {post.post.comments.map((c) => (
              <Comment comment={c} postId={post.post._id} key={c._id} />
            ))}
          </div>
        </div>
      </div>
    ) : <Loading />
  }
}


const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getPostById })(SinglePost)