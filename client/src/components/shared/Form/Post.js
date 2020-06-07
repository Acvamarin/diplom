import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import { remove, update } from "../../../redux/actions/post";

import Like from "./Like";
import DisLike from "./DisLike";
import ProfileImage from "../ProfileImage";

class Post extends React.Component {
  componentDidMount() {
    this.refs.body.innerHTML = this.props.post.body;
  }

  delete = () => this.props.remove(this.props.post._id);
  update = () => this.props.update(this.props.post._id);

  render() {
    const { post, auth, TYPE } = this.props;
    return (
      <div className="card mb-4 bg-dark px-2 ">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <Link to={"/user/" + post.user._id}>
                  <ProfileImage user={post.user} width="50" />
                </Link>
              </div>
              <div className="ml-2 text-white ">
                <div className="h5 m-0">{post.user.name}</div>
                <div className="h7 text-muted">
                  <i className="fa fa-clock-o"></i>{" "}
                  {new Date(post.createdDate).toDateString()}
                </div>
              </div>
            </div>
            {auth.isAuthenticated && auth.user.name === post.user.name &&  (
              <div className="dropdown bg-white">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  id="drop"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="drop"
                >
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={this.delete}
                  >
                    Удалить
                  </a>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={this.update}
                  ></a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-body bg-white  " ref="body"></div>
        <div className="card-footer ">
          <Like postId={post._id} likes={post.likes} TYPE={TYPE} />
          <DisLike postId={post._id} dislikes={post.dislikes} TYPE={TYPE} />
          <Link to={"/post/" + post._id} className="card-link">
            <i>комментировать</i>
          </Link>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { remove, update })(Post);
