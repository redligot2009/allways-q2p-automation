import axios from "axios";
import authHeader from "./auth-header";

const register = (username, 
                  email, 
                  password, 
                  first_name="", 
                  middle_name="", 
                  last_name="") => {
  let result = axios.post("auth/users/", {
    username,
    email,
    password,
    first_name,
    last_name,
  })
  .then((response) => {
    axios.put(`api/accounts/${username}/`,{
      middle_name
    })
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

      return response.data;
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

/*
///////////////////////////////
QUOTATION API SERVICE FUNCTIONS
///////////////////////////////
*/

const createQuotation = (quotation) => {
  // TODO: Implement API call to create a new quotation
}

const retrieveQuotation = (id) => {
  // TODO: Implement API call to retrieve quotation by ID
}

const retrieveQuotations = (approval_status, client) => {
  // TODO: Implement API call to retrieve list of all quotations by approval_status and / or client
}

const updateQuotation = (quotation) =>
{
  // TODO: Implement API call to update quotation.
}

const deleteQuotation = (id) => 
{
  // TODO: Implement API call to delete quotation by ID.
}

/*
///////////////////////////////
JOB ORDER API SERVICE FUNCTIONS
///////////////////////////////
*/

const createJobOrder = (quotation) => {
  // TODO: Implement API call to create new job order from a given quotation.
}

const retrieveJobOrder = (id) => {
  // TODO: Implement API call to retrieve job order details by ID
}

const retrieveJobOrders = () => {
  // TODO: Implement API call to retrieve list of job orders
}

const updateJobOrder = (jobOrder) => {
  // TODO: Implement API call to update a specific job order
}

const deleteJobOrder = (jobOrder) => {
  // TODO: Implement API call to delete a specific job order
}

// eslint-disable-next-line
export default {
  register,
  login,
  logout,
  getProfile,
  verifyLoggedIn,
};
