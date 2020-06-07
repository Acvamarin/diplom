import React from 'react'
import { connect } from 'react-redux'

import { getUserById } from '../../redux/actions/user'
import Loader from '../shared/Loading'
import PostForm from '../shared/PostForm'
import Posts from '../shared/Posts'
import ProfileImage from '../shared/ProfileImage'
import Subscription from './Subscription'


class UserProfile extends React.Component {

  componentDidMount() {
    this.props.getUserById(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.isLoading && nextProps.user.user === null) {
      this.props.history.push('/404')
    }
  }

  render() {
    const { user: { user, isLoading }, auth } = this.props
    return !isLoading && user !== null ? (
      <React.Fragment>
        <div className="row mt-5">
          <div className="col-md-6 mx-auto">
            <div className="row">
              <div className="col-8">
                <h2 className="profile-username">
                  <div className="col-md-1"><div>{user.name}</div>
                    <div>{user.lastName}</div> </div>

                </h2>
                <p>
                  <strong>Регистрация: </strong>
                  {new Date(user.createdDate).toDateString()}
                </p>
                <p>
                  <strong>Статус: </strong>
                  {user.status}
                </p>
                <p>
                  <strong>День рождения: </strong>
                  {user.happyBirthday}
                </p>
                <p>
                  <strong>Место учёбы: </strong>
                  {user.placeLes}
                </p>
                {(auth.user.id === user._id) && (
                  <Subscription userId={user._id} />
                )}
              </div>
              <div className="col-4 text-center">
                <ProfileImage user={user} />
              </div>
            </div>
          </div>
        </div>
        {!(auth.user.id === user._id) && (
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <div className="col-4 mx-auto">
                <Subscription userId={user._id} />
              </div>
            </div>
          </div>
        )}
        <div className="row mt-4">
          <div className="col-md-8 mx-auto">
            {auth.user.id === user._id && <PostForm />}
            <Posts queryParams={{ user: user._id }} />
          </div>
        </div>
      </React.Fragment>
    ) : (
        <Loader />
      );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  subscriptions: state.subscription.lengths
})

export default connect(mapStateToProps, { getUserById })(UserProfile)
