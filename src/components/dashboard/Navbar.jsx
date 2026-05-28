import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import socket from "../../socket";

import {
  getUnreadCount,
} from "../../services/notificationService";

function Navbar() {

const [count,setCount]=
useState(0);

const [user,setUser]=
useState({

name:"",
role:"",
profilePic:""

});


// =========================
// LOAD USER
// =========================

const loadUser=()=>{

const storedUser=
JSON.parse(

localStorage.getItem(
"user"
)

);

if(storedUser){

setUser(
storedUser
);

}

};


// =========================
// FETCH COUNT
// =========================

const fetchCount=
async()=>{

try{

const unread=
await getUnreadCount();

setCount(
unread
);

}

catch(error){

console.log(
error
);

}

};


// =========================
// EFFECT
// =========================

useEffect(()=>{

loadUser();

fetchCount();

const storedUser=
JSON.parse(

localStorage.getItem(
"user"
)

);


// =========================
// SOCKET ROOM JOIN
// =========================

if(

storedUser?._id

){

socket.emit(

"join",

storedUser._id

);

}


// =========================
// EVENTS
// =========================

const handleNew=()=>{

setCount(

prev=>prev+1

);

};

const handleRead=()=>{

setCount(

prev=>

prev>0

? prev-1

:0

);

};

const handleDelete=()=>{

fetchCount();

};


// =========================
// LISTEN
// =========================

socket.on(

"newNotification",

handleNew

);

socket.on(

"notificationRead",

handleRead

);

socket.on(

"notificationDeleted",

handleDelete

);


// =========================
// PROFILE UPDATE
// =========================

window.addEventListener(

"profileUpdated",

loadUser

);


// =========================
// CLEANUP
// =========================

return()=>{

socket.off(

"newNotification",

handleNew

);

socket.off(

"notificationRead",

handleRead

);

socket.off(

"notificationDeleted",

handleDelete

);

window.removeEventListener(

"profileUpdated",

loadUser

);

};

},[]);



return(

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

{/* LEFT */}

<div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">

Dashboard Overview

</h1>

<p className="text-slate-400 mt-2 text-sm sm:text-base">

Monitor your inventory performance

</p>

</div>


{/* RIGHT */}

<div className="flex items-center gap-6 w-full sm:w-auto justify-between">

{/* NOTIFICATION */}

<div className="relative">

<Bell
className="text-white"
/>

{

count>0 && (

<div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">

{count}

</div>

)

}

</div>


{/* PROFILE */}

<div className="flex items-center gap-3">

{

user.profilePic ? (

<img

src={

user.profilePic

}

alt="Profile"

className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-cyan-500"

/>

)

:

(

<div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl uppercase">

{

user.name?.charAt(0)

}

</div>

)

}

<div>

<h2 className="font-bold text-white">

{user.name}

</h2>

<p className="text-slate-400 text-sm">

{user.role}

</p>

</div>

</div>

</div>

</div>

);

}

export default Navbar;