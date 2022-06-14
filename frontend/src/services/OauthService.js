/* eslint-disable */
import axios from "axios";
import http from "../http-common";

const querystring = require('query-string');


class OauthService {
  login(username, password) {

    return axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    }).post("/auth/token", querystring.stringify({
      username: username, //gave the values directly for testing
      password: password,
    })).then(response => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  checkToken() {
    let user = JSON.parse(localStorage.getItem("user"))
    let expired_at = user['expired_at']
    console.log(expired_at)
    if( expired_at <= Math.floor((new Date).getTime()/1000)) {
      this.logout()
      window.location.reload();
    }
  }

  activate(token) {
    return axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json"
      }
    }).post("/auth/activate/" + token)
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
    }).post("/auth/register", {
      email, firstname, lastname, password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new OauthService();
