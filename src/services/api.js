import axios from "axios";

const API = axios.create({

  baseURL:import.meta.env.VITE_API_URL,

  headers: {

    "Content-Type":
      "application/json"

  },

  withCredentials: false

});


// =========================
// REQUEST INTERCEPTOR
// =========================

API.interceptors.request.use(

(req)=>{

const token=

localStorage.getItem(
"token"
);

if(token){

req.headers.Authorization=

`Bearer ${token}`;

}

return req;

},

(error)=>{

return Promise.reject(
error
);

}

);


// =========================
// RESPONSE INTERCEPTOR
// =========================

API.interceptors.response.use(

(response)=>{

return response;

},

(error)=>{

if(

error.response?.status===401

){

// Remove expired auth

localStorage.removeItem(
"user"
);

localStorage.removeItem(
"token"
);

}

return Promise.reject(
error
);

}

);


export default API;