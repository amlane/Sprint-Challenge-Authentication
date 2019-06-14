import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Jokes from "./components/Jokes";

import "./styles/App.css";

class App extends React.Component {
  logout = e => {
    e.preventDefault();

    localStorage.removeItem("token");
    this.props.history.push("/signin");
  };

  render() {
    return (
      <div className="App">
        <nav>
          <h1>Dad Jokes</h1>
          <NavLink to="/signup">Sign Up</NavLink>{" "}
          <NavLink to="/signin">Sign In</NavLink>{" "}
          <NavLink to="/jokes">Jokes</NavLink>
          <button onClick={this.logout}>Log Out</button>
        </nav>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default withRouter(App);
