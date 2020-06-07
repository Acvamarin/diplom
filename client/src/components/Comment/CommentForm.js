import React from './node_modules/react'
import { connect } from './node_modules/react-redux'
import Quill from './node_modules/react-quill'

import { createComment } from '../../redux/actions/post'

class CommentForm extends React.Component {

  constructor() {
    super()
    this.state = { body: '' }
  }

  onChange = (body) => this.setState({ body })

  onSubmit = (e) => {
    e.preventDefault()
    const { body } = this.state
    this.props.createComment(this.props.postId, { body })
    this.setState({ body: '' })
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Quill
                placeholder="Напиши что-нибудь"
                theme="snow"
                modules={{ toolbar: false }}
                value={this.state.body}
                onChange={this.onChange}
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-dark">Отправить</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { createComment })(CommentForm)