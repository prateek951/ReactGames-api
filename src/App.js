import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Games from "./Games";
import ShowGamePage from "./components/ShowGamePage";
import SignUpPage from "./components/auth/SignUpPage";

class App extends Component {
  state = {
    user: {
      token: null
    }
  };
  doLogout = () => {
    const { token } = this.state.user;
    this.setState({ user: { token: null } });
  };
  render() {
    const { token } = this.state.user;
    const { redirect } = this.state;
    return (
      <div className="ui container">
        <Header isAuthenticated={!!token} doLogout={this.doLogout} />
        <br />
        <Route path="/" exact component={HomePage} />
        <Route path='/register' component={SignUpPage}/>

        <Route path="/games" component={Games} />
        <Route path="/games/:_id" component={ShowGamePage} />
      </div>
    );
  }
}

export default App;
