import React from 'react'
import { connect } from 'react-redux'

import { getAll as getAllSubscriptions } from '../../redux/actions/subscription'
import Loading from '../shared/Loading'
import Posts from '../shared/Posts'

class Subscrib extends React.Component {

  componentDidMount() {
    this.props.getAllSubscriptions({
      subscriber: this.props.auth.user.id
    })
  }

  render() {
    const { isLoading, subscriptions } = this.props.subscription
    return !isLoading ? (
      <div className="row mt-4">
        <div className="col-md-8 mx-auto">
          {subscriptions.length !== 0 ? (
            <Posts
              queryParams={{
                users: subscriptions.map((s) => s.profile).join(","),
              }}
            />
          ) : (
            <div className="text-center">
              <h2>Нет подписчиков</h2>
            </div>
          )}
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}


const mapStateToProps = (state) => ({
  subscription: state.subscription,
  auth: state.auth
})

export default connect(mapStateToProps, { getAllSubscriptions })(Subscrib)
