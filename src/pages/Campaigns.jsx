import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import {
  Trash2,
  Search,
  Languages,
  Copy,
  Pencil,
  Save
} from "lucide-react";

import {
  getProducts,
  deleteProduct,
  updateCampaign
} from "../services/productService";

import toast from "react-hot-toast";
import axios from "axios";

function Campaigns() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [riskFilter, setRiskFilter] =
    useState("All");

  const [
    translatedCampaigns,
    setTranslatedCampaigns
  ] = useState({});

  const [
    editedCampaigns,
    setEditedCampaigns
  ] = useState({});

  const [
    editingCampaigns,
    setEditingCampaigns
  ] = useState({});

  const [
    selectedLanguage,
    setSelectedLanguage
  ] = useState("en");


  // =========================
  // LANGUAGES
  // =========================

  const languages = [

    { name:"English", code:"en" },
    { name:"Hindi", code:"hi" },
    { name:"Telugu", code:"te" },
    { name:"Tamil", code:"ta" },
    { name:"Kannada", code:"kn" },
    { name:"Malayalam", code:"ml" },
    { name:"Marathi", code:"mr" },
    { name:"Gujarati", code:"gu" },
    { name:"Bengali", code:"bn" },
    { name:"Punjabi", code:"pa" },
    { name:"Urdu", code:"ur" },
    { name:"Odia", code:"or" }

  ];


  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts =
  async()=>{

    try{

      setLoading(true);

      const data =
      await getProducts();

      const riskyProducts =
      data.filter(

        (product)=>

        product.risk !== "Healthy"

        &&

        product.risk !== "Pending"

      );

      setProducts(
        riskyProducts
      );

    }

    catch{

      toast.error(
        "Failed to fetch campaigns"
      );

    }

    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchProducts();

  },[]);



  // =========================
  // TRANSLATE
  // =========================

  const handleTranslate =
  async(
    id,
    campaignText
  )=>{

    try{

      const response =
      await axios.post(

         import.meta.env.VITE_API_URL,


        {

          text:
          campaignText,

          language:
          selectedLanguage

        }

      );

      setTranslatedCampaigns(

        prev=>({

          ...prev,

          [id]:
          response.data.translatedText

        })

      );

      toast.success(
        "Translated successfully"
      );

    }

    catch(error){

      console.log(error);

      toast.error(
        "Translation failed"
      );

    }

  };



  // =========================
  // COPY
  // =========================

  const handleCopy =
  async(text)=>{

    try{

      await navigator.clipboard.writeText(
        text
      );

      toast.success(
        "Campaign copied"
      );

    }

    catch{

      toast.error(
        "Copy failed"
      );

    }

  };



  // =========================
  // DELETE
  // =========================

  const handleDelete =
  async(id)=>{

    try{

      await deleteProduct(id);

      toast.success(
        "Campaign deleted"
      );

      await fetchProducts();

    }

    catch{

      toast.error(
        "Delete failed"
      );

    }

  };
// =========================
// SAVE CAMPAIGN
// =========================

const handleSaveCampaign =
async(productId)=>{

try{

const campaignText =

editedCampaigns[
productId
]

??

translatedCampaigns[
productId
]

??

products.find(

p=>p._id===productId

)?.aiCampaign;


if(!campaignText){

toast.error(
"Campaign cannot be empty"
);

return;

}

await updateCampaign(

productId,
campaignText

);

toast.success(
"Campaign saved successfully"
);

setEditingCampaigns(

prev=>({

...prev,

[productId]: false

})

);

setEditedCampaigns(

prev=>({

...prev,

[productId]: undefined

})

);

setTranslatedCampaigns(

prev=>({

...prev,

[productId]: undefined

})

);

// Refresh products
await fetchProducts();

}

catch(error){

console.log(error);

toast.error(
"Save failed"
);

}

};


  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredProducts =
  useMemo(()=>{

    return products.filter(

      (product)=>{

        const value =
        search.toLowerCase();

        const matchesSearch =

        product.productName
        ?.toLowerCase()
        .includes(value)

        ||

        product.risk
        ?.toLowerCase()
        .includes(value);

        const matchesRisk =

        riskFilter==="All"

        ||

        product.risk===
        riskFilter;

        return(

          matchesSearch

          &&

          matchesRisk

        );

      }

    );

  },[
    products,
    search,
    riskFilter
  ]);



  // =========================
  // RISK COLORS
  // =========================

  const getRiskColor =
  (risk)=>{

    switch(risk){

      case "Critical":

      return "bg-red-500/20 text-red-400 border border-red-500/30";

      case "Dead Stock":

      return "bg-orange-500/20 text-orange-400 border border-orange-500/30";

      case "Expiry Risk":

      return "bg-pink-500/20 text-pink-400 border border-pink-500/30";

      case "Slow Moving":

      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

      default:

      return "bg-green-500/20 text-green-400 border border-green-500/30";

    }

  };



return(

<div className="flex bg-slate-950 text-white min-h-screen">

<Sidebar/>

<div
className="
flex-1
lg:ml-72
overflow-y-auto
"
>
<div className="p-4 sm:p-6 lg:p-8">

<Navbar/>

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 mt-10">

{

loading ?

<div className="text-center py-20">

Loading campaigns...

</div>

:

<>

{/* SEARCH */}

<div className="flex flex-col lg:flex-row gap-4 mb-6">
<div className="relative flex-1">

<Search
size={18}
className="absolute left-3 top-4 text-slate-400"
/>

<input
type="text"
placeholder="Search product or risk"
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4"
/>

</div>

<select
value={riskFilter}
onChange={(e)=>
setRiskFilter(
e.target.value
)
}
className="
bg-slate-800
px-4
py-3
rounded-xl
w-full
lg:w-auto
"
>

<option value="All">All Risks</option>
<option value="Critical">Critical</option>
<option value="Dead Stock">Dead Stock</option>
<option value="Expiry Risk">Expiry Risk</option>
<option value="Slow Moving">Slow Moving</option>

</select>

</div>



<div className="space-y-6">

{

filteredProducts.map(

(product)=>(

<div
key={product._id}
className="bg-slate-950 border border-slate-800 rounded-3xl p-5"
>

<div className="flex flex-col lg:flex-row lg:justify-between gap-5">
<div>

<h2 className="text-xl sm:text-2xl font-bold">
{product.productName}

</h2>

<span
className={`px-4 py-2 rounded-full text-xs font-bold ${getRiskColor(product.risk)}`}
>

{product.risk}

</span>

</div>


<div className="flex flex-wrap gap-3">
<select
value={selectedLanguage}
onChange={(e)=>
setSelectedLanguage(
e.target.value
)
}
className="bg-slate-800 rounded-xl px-3"
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
onClick={()=>
handleTranslate(
product._id,
product.aiCampaign
)
}
className="bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded-xl"
>

<Languages size={18}/>

</button>


<button
onClick={()=>{

const text=

editedCampaigns[
product._id
]

??

translatedCampaigns[
product._id
]

??

product.aiCampaign;

handleCopy(text);

}}
className="
bg-green-500
hover:bg-green-600
transition-all
duration-300
p-3
rounded-xl
hover:scale-105
"
>

<Copy size={18}/>

</button>


<button
onClick={()=>
handleDelete(
product._id
)
}
className="
bg-red-500
hover:bg-red-600
transition-all
duration-300
p-3
rounded-xl
hover:scale-105
"
>

<Trash2 size={18}/>

</button>

</div>

</div>



<div className="mt-6">

<div className="flex justify-between mb-3">

<h3 className="text-lg font-semibold text-cyan-400">

AI Campaign

</h3>

<button

onClick={()=>{

if(

editingCampaigns[
product._id
]

){

handleSaveCampaign(
product._id
);

}

else{

setEditingCampaigns(

prev=>({

...prev,

[product._id]:
true

})

);

}

}}

className="
flex
items-center
gap-2
bg-cyan-500
hover:bg-cyan-600
transition-all
duration-300
px-4
py-2
rounded-xl
hover:scale-105
"
>

{

editingCampaigns[
product._id
]

?

<>

<Save size={16}/>
Save

</>

:

<>

<Pencil size={16}/>
Edit

</>

}

</button>

</div>


<textarea

value={

editedCampaigns[
product._id
]

??

translatedCampaigns[
product._id
]

??

product.aiCampaign

??

"Generating..."

}

readOnly={

!editingCampaigns[
product._id
]

}

onChange={(e)=>

setEditedCampaigns(

prev=>({

...prev,

[product._id]:
e.target.value

})

)

}

className="
w-full
bg-slate-900
border
border-slate-800
rounded-2xl
p-4
sm:p-5
min-h-[200px]
sm:min-h-[250px]
resize-none
outline-none
leading-7
text-sm
sm:text-base
"

/>

</div>

</div>

)

)

}

</div>

</>

}

</div>

</div>

</div>

</div>

);

}

export default Campaigns;