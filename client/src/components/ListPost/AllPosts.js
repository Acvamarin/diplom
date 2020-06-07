import React from 'react'
import { connect } from 'react-redux'
import Filtrs from './Filtrs'
import PostForm from '../shared/PostForm'
import Posts from '../shared/Posts'

class AllPosts extends React.Component {

  render() {
    const { auth } = this.props
    return (
      
        <div className="row mt-4">
          
          <div className="col-md-8 mx-auto">
          <Filtrs/>
            {auth.isAuthenticated && <PostForm />}
            <Posts queryParams={{}} />
          </div>
        </div>
      
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AllPosts)
