import axios from "axios";
import authHeader from "./auth-header";
import {getFilteredObject} from "../_helpers/";

const register = (newAccount) => {
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
  let result = axios.post("auth/users/", user)
  .then((response) => {
    axios.put(`api/accounts/${user.username}/`,account)
  });
  return result;
};

const login = (username, password) => {
  return axios
    .post("auth/jwt/create", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log(response.data);
      }
    });
};

const getProfile = () => {
  return axios
    .get("auth/users/me/", { headers: authHeader() })
    .then((response) => {
      
      const result = axios
        .get(`api/accounts/${response.data.username}/`, { headers: authHeader() })
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

const verifyLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.post('/auth/jwt/verify',user.access)
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
  verifyLoggedIn,
};
