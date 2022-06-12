/* eslint-disable */
import axios from "axios";

const querystring = require('query-string');


class OauthService {
  login(username, password) {

    return axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    }).post("/oauth/token", querystring.stringify({
      username: username, //gave the values directly for testing
      password: password,
    })).then(response => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, firstname, lastname, password) {
    return axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json"
      }
    }).post("/oauth/register", {
      email, firstname, lastname, password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new OauthService();
