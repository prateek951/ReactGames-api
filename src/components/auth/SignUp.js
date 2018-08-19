import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import { Link } from "react-router-dom";
import FormInlineMessage from "../FormInlineMessage";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        pass: "",
        cpass: ""
      },
      loading: false,
      errors: {}
    };
  }
  handleStringChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };

  validate = data => {
    const errors = {};
    //Pull out the email,pass,cpass from the data and perform validation
    const { email, pass, cpass } = data;
    if (!isEmail(email)) errors.email = "Invalid email address";
    if (!email) errors.email = "This field can't be blank";
    if (!pass) errors.pass = "This field can't be blank";
    if (cpass !== pass) errors.pass = "Passwords do not match";
    return errors;
  };

  handleRegister = e => {
    e.preventDefault();
    //check for errors
    const errors = this.validate(this.state.user);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      //if there are no errors perform the registration
      this.setState({ loading: true });
      this.props
        .doRegister(this.state.user)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  render() {
    const { errors, user, loading } = this.state;
    const classes = loading? "ui form loading" : "ui form";
    return (
      <form className={classes} onSubmit={this.handleRegister}>
        <div className="ui grid">
          <div className="twelve wide column">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email Address"
                //   ref={input => this.name = input}
                value={user.email}
                onChange={this.handleStringChange}
              />
            </div>
            <div className="field">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Make it secure"
                value={user.pass}
                onChange={this.handleStringChange}
              />
            </div>
            <div className="field">
              <label htmlFor="cpass">Confirm Password</label>
              <input
                type="password"
                name="cpass"
                id="cpass"
                placeholder="Make it secure"
                value={user.cpass}
                onChange={this.handleStringChange}
              />
            </div>
            <div className="ui fluid buttons">
              <button className="ui primary button" type="submit">
                Sign Up
              </button>
              <div className="or" />
              <a className="ui button">Cancel</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

SignUp.propTypes = {
  doRegister: PropTypes.func.isRequired
}

export default SignUp;
