import axios from "axios";
import authHeader from "./auth-header";
import {getFilteredObject} from "../_helpers/";

const register = (newAccount, cancelToken) => {
  let user = getFilteredObject(newAccount,[
    "username",
    "email",
    "password",
    "first_name",
    "last_name"
  ])
  let account = getFilteredObject(newAccount,[
    "middle_name",
    "job_position",
    "plate_number",
    "shipping_address",
    "mobile_number",
  ])
  account.user = user.id;
  // console.log("RESULTING OBJECTS: ", account, ", \n", user)
  // console.log("RESULTING QUERY: ", JSON.stringify(account))
  let result = axios.post("auth/users/", user,{cancelToken: cancelToken})
  .then((response) => {
    axios.put(`api/accounts/${user.username}/`,account,{cancelToken: cancelToken})
  });
  return result;
};

const login = (username, password, cancelToken) => {
  return axios
    .post("auth/jwt/create", {
      username,
      password,
    },{cancelToken: cancelToken})
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log(response.data);
      }
    });
};

const getProfile = (cancelToken) => {
  return axios
    .get("auth/users/me/", { headers: authHeader() })
    .then((response) => {
      
      const result = axios
        .get(`api/accounts/${response.data.username}/`, { headers: authHeader(), cancelToken: cancelToken})
        .then((response)=>{
          // console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
      
      return result;
      // return response.data;
    })
}

const updateProfile = (username, updatedAccount, cancelToken) => {
  let user = getFilteredObject(updatedAccount,[
    "username",
    "email",
    "first_name",
    "last_name"
  ])
  let account = getFilteredObject(updatedAccount,[
    "middle_name",
    "shipping_address",
    "mobile_number",
  ])
  return axios.patch(`auth/users/${updatedAccount.user_id}`, user,{cancelToken: cancelToken})
    .then((response)=>{
      axios.put(`api/accounts/${user.username}/`,account,{cancelToken: cancelToken})
    });
}

const verifyLoggedIn = (cancelToken) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.post('/auth/jwt/verify',user.access,{cancelToken: cancelToken})
      .then((response)=>{
        return user;
      })
      .catch((error)=>{
        return error;
      });
}

const logout = () => {
  localStorage.removeItem("user");
  return Promise.resolve();
};

// eslint-disable-next-line
export default {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  verifyLoggedIn,
};
