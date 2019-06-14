import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "../../styles/Auth.css";

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3300/api/register", this.state)
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <header className="App-header">
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2>Log In</h2>

          <label>username</label>
          <input
            value={this.state.username}
            type="text"
            required
            name="username"
            onChange={this.handleInput}
          />

          <label>password</label>
          <input
            value={this.state.password}
            type="password"
            required
            name="password"
            onChange={this.handleInput}
          />

          <button type="submit">Sign Up</button>
          <p className="new-user-signup">
            Already a User? <NavLink to="/signin">Log In</NavLink>
          </p>
        </form>
      </header>
    );
  }
}

export default SignUp;
