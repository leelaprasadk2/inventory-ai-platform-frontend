import { useEffect, useRef, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

function VerifyEmail(){

const { token } =
useParams();

const navigate =
useNavigate();

const hasCalled =
useRef(false);

const [status,setStatus]=
useState("loading");


// =========================
// VERIFY EMAIL
// =========================

const verifyUser =
async()=>{

try{

await API.get(

`/auth/verify-email/${token}`

);

setStatus(
"success"
);

toast.success(
"Email verified successfully"
);

setTimeout(()=>{

navigate("/login");

},3000);

}

catch(error){

setStatus(
"error"
);

toast.error(

error.response?.data
?.message ||

"Verification failed"

);

}

};


// =========================
// RUN ONCE
// =========================

useEffect(()=>{

if(hasCalled.current){

return;

}

hasCalled.current=true;

verifyUser();

},[]);


return(

<div
className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5"
>

<div
className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 text-center"
>

{/* LOGO */}

<h1
className="text-4xl font-bold text-cyan-400 mb-2"
>

Inventory AI

</h1>

<p
className="text-slate-300 mb-8"
>

Account Verification

</p>


{/* LOADING */}

{

status==="loading" && (

<>

<Loader2
size={80}
className="mx-auto animate-spin text-cyan-400"
/>

<h2
className="text-white text-2xl font-bold mt-6"
>

Verifying Email...

</h2>

<p
className="text-slate-300 mt-2"
>

Please wait while we verify your account

</p>

</>

)

}


{/* SUCCESS */}

{

status==="success" && (

<>

<CheckCircle
size={80}
className="mx-auto text-green-500"
/>

<h2
className="text-green-400 text-2xl font-bold mt-6"
>

Email Verified

</h2>

<p
className="text-slate-300 mt-2"
>

Redirecting to login page...

</p>

</>

)

}


{/* ERROR */}

{

status==="error" && (

<>

<XCircle
size={80}
className="mx-auto text-red-500"
/>

<h2
className="text-red-400 text-2xl font-bold mt-6"
>

Verification Failed

</h2>

<p
className="text-slate-300 mt-2"
>

Token invalid or expired

</p>

<button

onClick={()=>navigate("/")}

className="mt-6 bg-cyan-500 px-6 py-3 rounded-xl text-black font-bold hover:bg-cyan-400"

>

Back To Login

</button>

</>

)

}

</div>

</div>

);

}

export default VerifyEmail;