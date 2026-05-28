import { useState } from "react";

import {

LayoutDashboard,
Package,
Megaphone,
Bell,
Users,
User,
LogOut,
Menu,
X

} from "lucide-react";

import {

NavLink,
useNavigate

} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Sidebar(){

const navigate=
useNavigate();

const {

user,
logout

}=useAuth();

const [open,setOpen]=
useState(false);


// =========================
// LOGOUT
// =========================

const handleLogout=()=>{

logout();

navigate("/");

};


// =========================
// ADMIN MENU
// =========================

const adminMenu=[

{

name:"Notifications",
icon:Bell,
path:"/notifications"

},

{

name:"Users",
icon:Users,
path:"/users"

},

{

name:"Profile",
icon:User,
path:"/profile"

}

];


// =========================
// USER MENU
// =========================

const userMenu=[

{

name:"Dashboard",
icon:LayoutDashboard,
path:"/dashboard"

},

{

name:"Products",
icon:Package,
path:"/products"

},

{

name:"Campaigns",
icon:Megaphone,
path:"/campaigns"

},

{

name:"Notifications",
icon:Bell,
path:"/notifications"

},

{

name:"Profile",
icon:User,
path:"/profile"

}

];

const menuItems=

user?.role==="admin"

?adminMenu

:userMenu;


return(

<>

{/* MOBILE MENU BUTTON */}

<button

onClick={()=>setOpen(true)}

className="fixed top-4 left-4 z-50 lg:hidden bg-cyan-500 p-3 rounded-xl"

>

<Menu size={24}/>

</button>


{/* BACKDROP */}

{

open && (

<div

className="fixed inset-0 bg-black/60 z-40 lg:hidden"

onClick={()=>setOpen(false)}

/>

)

}


{/* SIDEBAR */}

<div

className={`

fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-50 transform transition-transform duration-300

${

open

? "translate-x-0"

: "-translate-x-full"

}

lg:translate-x-0

`}

>

{/* TOP */}

<div>

{/* HEADER */}

<div className="p-6 border-b border-slate-800 flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold text-cyan-400">

Inventory AI

</h1>

<p className="text-slate-400 mt-2">

Smart Inventory SaaS

</p>

</div>


{/* MOBILE CLOSE */}

<button

className="lg:hidden"

onClick={()=>setOpen(false)}

>

<X className="text-white"/>

</button>

</div>


{/* MENU */}

<div className="p-6 space-y-3">

{

menuItems.map(

(item)=>{

const Icon=item.icon;

return(

<NavLink

key={item.name}

to={item.path}

onClick={()=>setOpen(false)}

className={({

isActive

})=>

`

flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium

${

isActive

? "bg-cyan-500 text-black"

: "text-white hover:bg-slate-800"

}

`

}

>

<Icon size={22}/>

{item.name}

</NavLink>

);

}

)

}

</div>

</div>


{/* LOGOUT */}

<div className="p-6">

<button

onClick={handleLogout}

className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-400 transition-all duration-300 py-4 rounded-2xl font-bold"

>

<LogOut size={22}/>

Logout

</button>

</div>

</div>

</>

);

}

export default Sidebar;