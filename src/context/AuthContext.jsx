import {

  createContext,
  useContext,
  useEffect,
  useState

} from "react";

const AuthContext =
createContext();

export const AuthProvider =
({ children }) => {

const [user,setUser] =
useState(null);

const [loading,setLoading] =
useState(true);


// =========================
// LOAD USER
// =========================

useEffect(()=>{

try{

const storedUser=

localStorage.getItem(
"user"
);

const storedToken=

localStorage.getItem(
"token"
);

if(

storedUser &&
storedToken

){

const parsedUser=

JSON.parse(
storedUser
);

setUser({

...parsedUser,

token:
storedToken

});

}

}

catch(error){

console.log(

"Auth Load Error:",

error

);

localStorage.removeItem(
"user"
);

localStorage.removeItem(
"token"
);

}

finally{

setLoading(false);

}

},[]);


// =========================
// LOGIN
// =========================

const login =
(userData,token)=>{

localStorage.setItem(

"user",

JSON.stringify(
userData
)

);

localStorage.setItem(

"token",

token

);

setUser({

...userData,

token

});

};


// =========================
// LOGOUT
// =========================

const logout =
()=>{

localStorage.removeItem(
"user"
);

localStorage.removeItem(
"token"
);

setUser(null);

};


// =========================
// CONTEXT VALUE
// =========================

return(

<AuthContext.Provider

value={{

user,

login,

logout,

loading

}}

>

{children}

</AuthContext.Provider>

);

};

export const useAuth=
()=>useContext(
AuthContext
);