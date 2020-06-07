import React from "react";
import { connect } from "react-redux";

import { register } from "../../redux/actions/auth";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      lastName: "",
      status: "",
      happyBirthday: "",
      placeLes: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state, this.props.history);
  };

  render() {
    return (
      <div className="row mt-4">
        <div className="col-4 mx-auto">
          <div className="card bg-secondary text-white">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Регистрация</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      pattern=".{5,30}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      pattern=".{6,30}"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="LastName"
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Status"
                      type="text"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="HappyBirthday"
                      type="text"
                      name="happyBirthday"
                      value={this.state.happyBirthday}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="PlaceLes"
                      type="text"
                      name="placeLes"
                      value={this.state.placeLes}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);
