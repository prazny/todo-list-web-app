/* eslint-disable */
import axios from "axios";


export default axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": localStorage.getItem("user")? "Bearer " + (JSON.parse(localStorage.getItem("user")).access_token) : ""
  }
});
