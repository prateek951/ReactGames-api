import React, { Component } from "react";
import SignUp from "./SignUp";
import api from "../../api";

class SignUpPage extends Component {
  doRegister = data =>
    //hit the server if successful registration redirect to the login page
    api.users.create(data).then(() => this.props.history.push("/login"));
  render() {
    return (
      <div>
        <div className="ui segment">
          <SignUp doRegister={this.doRegister} />
        </div>
      </div>
    );
  }
}

export default SignUpPage;
