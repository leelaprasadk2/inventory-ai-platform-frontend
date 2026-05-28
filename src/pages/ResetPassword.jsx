import { useState } from "react";

import {

useParams,
useNavigate

} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

import AuthLayout from "../components/AuthLayout";

function ResetPassword(){

const {token}=
useParams();

const navigate=
useNavigate();

const [password,setPassword]=
useState("");

const [loading,setLoading]=
useState(false);


const handleSubmit=
async(e)=>{

e.preventDefault();

try{

setLoading(true);

const res=

await API.post(

`/auth/reset-password/${token}`,

{

password

}

);

toast.success(

res.data.message

);

setTimeout(()=>{

navigate("/");

},1500);

}

catch(error){

toast.error(

error.response?.data
?.message ||

"Reset failed"

);

}

finally{

setLoading(false);

}

};


return(

<AuthLayout>

<h1
className="text-3xl font-bold text-center mb-6"
>

Reset Password

</h1>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<input

type="password"

placeholder=
"Enter new password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

required

className=
"w-full p-3 rounded-xl border"

/>

<button

type="submit"

disabled={loading}

className=
"w-full bg-cyan-500 py-3 rounded-xl"

>

{

loading

?

"Updating..."

:

"Reset Password"

}

</button>

</form>

</AuthLayout>

);

}

export default ResetPassword;