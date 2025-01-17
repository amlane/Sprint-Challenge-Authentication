import React from "react";
import { axiosWithAuth } from "./auth/axiosWithAuth";

import "../styles/Jokes.scss";

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    axiosWithAuth()
      .get("http://localhost:3300/api/jokes")
      .then(res => {
        // console.log("jokes response", res);
        this.setState(() => ({
          jokes: res.data
        }));
      })
      .catch(error => {
        console.log(error.response.statusText);
      });
  }

  render() {
    return (
      <header className="App-header">
        <div className="jokes-cta">
          {this.state.jokes.map(joke => {
            return (
              <p className="jokes" key={joke.id}>
                {joke.joke}
              </p>
            );
          })}
        </div>
      </header>
    );
  }
}

export default Jokes;
