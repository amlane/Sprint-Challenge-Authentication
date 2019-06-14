const axios = require("axios");
const Users = require("./model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../auth/authenticate");
const secrets = require("../auth/authenticate.js");

module.exports = server => {
  server.get("/", testServer);
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function testServer(req, res) {
  res.send("It's alive!");
}

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({ saved, token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token //return the token upon login
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secrets.jwtKey, options);
}
