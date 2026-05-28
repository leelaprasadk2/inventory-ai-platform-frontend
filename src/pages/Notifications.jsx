import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import {

getNotifications,
markAsRead,
deleteNotification

} from "../services/notificationService";

import toast from "react-hot-toast";

import {

Bell,
Trash2,
CheckCircle

} from "lucide-react";

function Notifications() {

const [notifications,setNotifications]=
useState([]);

const [loading,setLoading]=
useState(false);


// =========================
// FETCH NOTIFICATIONS
// =========================

const fetchNotifications=
async()=>{

try{

setLoading(true);

const data=
await getNotifications();

setNotifications(
data
);

}

catch{

toast.error(
"Failed to fetch notifications"
);

}

finally{

setLoading(false);

}

};


// =========================
// LOAD
// =========================

useEffect(()=>{

fetchNotifications();

},[]);


// =========================
// MARK READ
// =========================

const handleRead=
async(id)=>{

try{

await markAsRead(id);

setNotifications(

prev=>

prev.map(

(notification)=>

notification._id===id

?{

...notification,

read:true

}

:notification

)

);

}

catch{

toast.error(
"Failed to update"
);

}

};


// =========================
// DELETE
// =========================

const handleDelete=
async(id)=>{

try{

await deleteNotification(id);

toast.success(
"Notification deleted"
);

setNotifications(

prev=>

prev.filter(

(notification)=>

notification._id!==id

)

);

}

catch{

toast.error(
"Delete failed"
);

}

};



return(

<div className="flex bg-slate-950 text-white min-h-screen">

<Sidebar/>


{/* MAIN */}

<div
className="
flex-1
lg:ml-72
p-4
sm:p-6
lg:p-8
overflow-y-auto
"
>

<Navbar/>


{/* HEADER */}

<div className="flex items-center gap-4 mt-8">

<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500 flex items-center justify-center">

<Bell className="text-black"/>

</div>

<div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

Notifications

</h1>

<p className="text-slate-400 mt-1 text-sm sm:text-base">

Inventory AI alerts and updates

</p>

</div>

</div>


{/* LIST */}

<div className="mt-10 space-y-5">

{

loading

?

(

<div className="text-center py-20 text-slate-400">

Loading notifications...

</div>

)

:

notifications.length===0

?

(

<div className="text-center py-20 text-slate-400">

No notifications found

</div>

)

:

(

notifications.map(

(notification)=>(

<div

key={notification._id}

className={`

p-4 sm:p-6
rounded-3xl
border
flex
flex-col
lg:flex-row
lg:items-start
lg:justify-between
gap-5
transition-all
duration-300

${

notification.read

? "bg-slate-900 border-slate-800"

: "bg-cyan-500/10 border-cyan-500"

}

`}

>

{/* MESSAGE */}

<div className="flex-1">

<h2 className="text-base sm:text-lg font-semibold leading-8">

{notification.message}

</h2>

<p className="text-slate-400 text-sm mt-3">

{

new Date(

notification.createdAt

).toLocaleString(

"en-GB",

{

day:"2-digit",
month:"2-digit",
year:"numeric",
hour:"numeric",
minute:"2-digit",
hour12:true

}

)

}

</p>

</div>


{/* ACTIONS */}

<div className="flex items-center gap-3">

{

!notification.read && (

<button

onClick={()=>

handleRead(

notification._id

)

}

className="bg-green-500 hover:bg-green-400 transition-all duration-300 p-3 rounded-xl"

>

<CheckCircle size={18}/>

</button>

)

}


<button

onClick={()=>

handleDelete(

notification._id

)

}

className="bg-red-500 hover:bg-red-400 transition-all duration-300 p-3 rounded-xl"

>

<Trash2 size={18}/>

</button>

</div>

</div>

)

)

)

}

</div>

</div>

</div>

);

}

export default Notifications;