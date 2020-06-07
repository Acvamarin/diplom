import React from 'react'
import { connect } from 'react-redux'
import Pagination from "react-js-pagination"

import { UPDATE_POSTS } from '../../redux/actions/types'

import { getAll } from '../../redux/actions/post'

import Post from './Form'
import Loading from './Loading'

const LIMIT = 2

class Posts extends React.Component {

  constructor() {
    super()
    this.state = { activePage: 1 }
  }

  componentDidMount() {
    this.props.getAll(this.getQueryParams())
  }

  onChange = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.getAll(this.getQueryParams())
    })
  }

  getQueryParams() {
    return Object.assign(
      {
        skip: (this.state.activePage - 1) * LIMIT,
        limit: LIMIT
      },
      this.props.queryParams
    )
  }

  render() {
    const { isLoading, posts, totalCount } = this.props.post
    return (
      <React.Fragment>
        {isLoading && <Loading />}
        {!isLoading && totalCount === 0 && (
          <div className="text-center ">
            <h2>There is nothing</h2>
          </div>
        )}
        {posts.map((p) => <Post post={p} key={p._id} TYPE={UPDATE_POSTS} />)}
        {!isLoading && totalCount > posts.length && (
      
            <Pagination
            prevPageText='prev'
            nextPageText='next'
            activePage={this.state.activePage}
            itemsCountPerPage={LIMIT}
            totalItemsCount={totalCount}
            onChange={this.onChange}
            itemClass="page-item"
            linkClass="page-link"
          />
      
        )}
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getAll })(Posts)
