import {

useState

} from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import AuthLayout from "../components/AuthLayout";

function ForgotPassword(){

const [email,setEmail]=
useState("");

const handleSubmit=
async(e)=>{

e.preventDefault();

try{

const res=

await API.post(

"/auth/forgot-password",

{

email

}

);

toast.success(

res.data.message

);

}

catch(error){

toast.error(

error.response?.data
?.message ||

"Error"

);

}

};


return(

<AuthLayout>

<h1
className="text-3xl font-bold text-center mb-6"
>

Forgot Password

</h1>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<input

type="email"

placeholder=
"Enter Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

className="w-full p-3 rounded-xl border"

required

/>

<button

type="submit"

className=
"w-full bg-cyan-500 py-3 rounded-xl"

>

Send Reset Link

</button>

</form>

</AuthLayout>

);

}

export default ForgotPassword;