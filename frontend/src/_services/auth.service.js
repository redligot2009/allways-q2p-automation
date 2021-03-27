import axios from "axios";
import authHeader from "./auth-header";

const register = (username, email, password, first_name="", middle_name="", last_name="") => {
  return axios.post("auth/users/", {
    username,
    email,
    password,
    first_name,
    last_name,
  })
  .then((response) => {
    return axios.patch(`api/accounts/${username}/`,{
      middle_name
    })
  });
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

      return response.data;
    });
};

const profile = () => {
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
    .catch((error) => {
      // console.log(error, authHeader());
      return error;
    })
}

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line
export default {
  register,
  login,
  logout,
  profile,
};
