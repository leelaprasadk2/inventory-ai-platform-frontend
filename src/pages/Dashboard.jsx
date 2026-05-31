import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import axios from "axios";

import toast from "react-hot-toast";

import {

  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  Boxes,
  MoveRight,
  Languages

} from "lucide-react";

import {

  getDashboardStats

} from "../services/dashboardService";



function Dashboard() {

  const [stats, setStats] =
    useState({});

  const [showModal,
    setShowModal] =
    useState(false);

  const [modalTitle,
    setModalTitle] =
    useState("");

  const [selectedProducts,
    setSelectedProducts] =
    useState([]);


  const [helpText, setHelpText] =
    useState(`


## 📌 How To Use Inventory AI

### 1. Add Products

• Go to Products page
• Fill all product fields
• Add Product button becomes active after all fields are filled
• Click **Add Product**

---

### 2. Upload CSV

• Go to Products
• Upload CSV file

Required CSV fields:


productName
stock
lastSoldDate
expiryDate
monthlySales
price


Date format:

DD-MM-YYYY



### 3. Dashboard Information

Dashboard values are generated automatically after products are processed by AI workflow.

#### • Total Products

Shows:


Total products uploaded by the user


Formula:


Total Products = Number of products in inventory




#### • Dead Stock

Shows products with very high stock and almost no sales movement.

Conditions:


Stock > 100
AND
Monthly Sales < 20
AND
Days Since Last Sold > 90


Action:


30% discount campaign suggested


#### • Expired Products

Shows products already expired.

Conditions:


Days To Expiry < 0


Action:


Remove product immediately

#### • Expiring Soon

Shows products that will expire within 7 days.

Conditions:

Days To Expiry <= 7
AND
Days To Expiry >= 0

Action:


Quick sale or bundle offers


---

#### • Low Stock

Shows products with low inventory quantity.

Conditions:

Stock < 20


Action:


Restock immediately


---

#### • Slow Moving

Shows products selling very slowly.

Conditions:


Stock > 80
AND
Monthly Sales < 30
AND
Days Since Last Sold > 30


Action:

Instagram ads + combo offers


#### • Critical

Shows products with very high risk.

Conditions:

Stock > 150
AND
Monthly Sales < 10
AND
Days Since Last Sold > 60


Action:

Heavy discount + clearance sale


 4. Campaign Page

• AI campaigns are generated automatically
• Translate campaigns into different languages
• Edit campaigns
• Save updated campaigns
• Copy campaigns
• Delete campaigns



5. Notifications

Alerts appear automatically for:

• Expired products
• Low stock products
• Critical products
• Dead stock products
• Expiring products



`);



const [selectedLanguage,setSelectedLanguage]=
useState("en");

const languages=[

{name:"English",code:"en"},
{name:"Hindi",code:"hi"},
{name:"Telugu",code:"te"},
{name:"Tamil",code:"ta"},
{name:"Kannada",code:"kn"}

];



useEffect(()=>{

fetchDashboard();

},[]);



const fetchDashboard=
async()=>{

try{

const data=
await getDashboardStats();

setStats(data);

}

catch(error){

console.log(error);

}

};



const handleHelpTranslate=
async()=>{

try{

const response=
await axios.post(

`${import.meta.env.VITE_API_URL}/translate`,
{

text:helpText,
language:selectedLanguage

}

);

setHelpText(

response.data.translatedText

);

toast.success(
"Translated successfully"
);

}

catch{

toast.error(
"Translation failed"
);

}

};



// =========================
// OPEN MODAL
// =========================

const openProducts=
(title,products)=>{

setModalTitle(
title
);

setSelectedProducts(
products||[]
);

setShowModal(
true
);

};




return(

<div className="flex bg-slate-950 text-white min-h-screen">

<Sidebar/>

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

<div className="mt-8">

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

Dashboard Overview

</h1>

<p className="text-slate-400 mt-2 text-sm sm:text-base">

Monitor your inventory performance

</p>

</div>


{/* GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

<Card
title="Total Products"
value={stats.totalProducts}
icon={<Package/>}
color="bg-cyan-500"
/>

<Card
title="Dead Stock"
value={stats.deadStock}
icon={<AlertTriangle/>}
color="bg-red-500"
onClick={()=>openProducts(
"Dead Stock Products",
stats.deadStockProducts
)}
/>

<Card
title="Expired Products"
value={stats.expired}
icon={<AlertTriangle/>}
color="bg-red-600"
onClick={()=>openProducts(
"Expired Products",
stats.expiredProducts
)}
/>

<Card
title="Critical"
value={stats.critical}
icon={<TrendingUp/>}
color="bg-purple-500"
onClick={()=>openProducts(
"Critical Products",
stats.criticalProducts
)}
/>

<Card
title="Expiring Soon"
value={stats.expiringSoon}
icon={<Clock/>}
color="bg-yellow-500"
onClick={()=>openProducts(
"Expiring Soon Products",
stats.expiringSoonProducts
)}
/>

<Card
title="Low Stock"
value={stats.lowStock}
icon={<Boxes/>}
color="bg-pink-500"
onClick={()=>openProducts(
"Low Stock Products",
stats.lowStockProducts
)}
/>

<Card
title="Slow Moving"
value={stats.slowMoving}
icon={<MoveRight/>}
color="bg-orange-500"
onClick={()=>openProducts(
"Slow Moving Products",
stats.slowMovingProducts
)}
/>

</div>


{/* HOW TO USE */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 mt-8">

<div className="flex flex-col md:flex-row justify-between items-center gap-4">

<h2 className="text-xl sm:text-2xl font-bold">

How To Use Inventory AI

</h2>


<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

<select

value={selectedLanguage}

onChange={(e)=>

setSelectedLanguage(
e.target.value
)

}

className="bg-slate-800 px-4 py-2 rounded-xl w-full sm:w-auto"

>

{

languages.map(

(lang)=>(

<option
key={lang.code}
value={lang.code}
>

{lang.name}

</option>

)

)

}

</select>


<button

onClick={handleHelpTranslate}

className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center justify-center gap-2"

>

<Languages size={18}/>

Translate

</button>

</div>

</div>


<div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 mt-5 whitespace-pre-line leading-8 text-slate-300 overflow-x-auto text-sm sm:text-base">

{helpText}

</div>

</div>

</div>


{/* MODAL */}

{

showModal && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

<div className="bg-slate-900 p-6 rounded-3xl w-full max-w-[500px]">

<h2 className="text-xl sm:text-2xl font-bold">

{modalTitle}

</h2>

<div className="mt-5 max-h-[350px] overflow-y-auto space-y-3">

{

selectedProducts.length>0

?

selectedProducts.map(

(product)=>(

<div
key={product._id}
className="bg-slate-800 rounded-xl p-4"
>

<h3 className="font-bold text-lg">

{product.productName}

</h3>

<p>

Stock: {product.stock}

</p>

{

modalTitle==="Expired Products"

?

(

<p className="text-red-400 font-semibold">

Status: Expired ❌

</p>

)

:

(

<p>

Risk: {product.risk}

</p>

)

}

{

modalTitle==="Expiring Soon Products"

&&

product.daysToExpiry!==undefined

&&

(

<p className="text-yellow-400 font-semibold">

Days Left:

{product.daysToExpiry}

days

</p>

)

}

</div>

)

)

:

<p>No products found</p>

}

</div>

<button

onClick={()=>setShowModal(false)}

className="mt-6 bg-red-500 px-4 py-2 rounded-xl"

>

Close

</button>

</div>

</div>

)

}

</div>

);

}



function Card({

title,
value,
icon,
color,
onClick

}){

return(

<div

onClick={onClick}

className="
bg-slate-900
border
border-slate-800
rounded-3xl
p-6
flex
justify-between
items-center
cursor-pointer
hover:scale-105
transition-all
"

>

<div>

<p className="text-slate-400">

{title}

</p>

<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
{value || 0}

</h2>

</div>

<div className={`${color} p-3 sm:p-5 rounded-2xl`}>
{icon}

</div>

</div>

);

}

export default Dashboard;