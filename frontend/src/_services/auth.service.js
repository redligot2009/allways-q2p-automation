import axios from "axios";
import authHeader from "./auth-header";

const register = (username, email, password) => {
  return axios.post("auth/users/", {
    username,
    email,
    password,
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
        console.log(response.data);
      }

      return response.data;
    });
};

const profile = () => {
  return axios
    .get("auth/users/me/",
      { 
        headers: authHeader() 
      })
    .then((response) => {
      
      //let result = axios.get().then()
      let result = { ...response.data, 
      };

      return result;
    })
    .catch((error)=>{
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
