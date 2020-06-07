import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { create, getAll, remove } from '../../redux/actions/subscription'

class Subscription extends React.Component {

  componentDidMount() {
    this.props.getAll({ profile: this.props.userId })
  }

  onClick = (e) => {
    e.preventDefault()
    const { subscription: { subscriptions }, auth, userId } = this.props
    if (!auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      const existedSub = subscriptions.find((s) => s.subscriber === auth.user.id)
      if (existedSub) {
        this.props.remove(existedSub._id)
      } else {
        this.props.create({ profile: userId })
      }
    }
  }

  render() {
    const { subscriptions, isLoading } = this.props.subscription
    return !isLoading && (
      <button
        className="btn btn-dark btn-block subscribe-btn"
        onClick={this.onClick}
      >
        Subscribe | <i className="fa fa-users"></i> {subscriptions.length}
      </button>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  subscription: state.subscription
})

export default connect(mapStateToProps, {
  create, getAll, remove
})(withRouter(Subscription))
