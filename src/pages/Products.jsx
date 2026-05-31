import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import {
  getProducts,
  createProduct,
  deleteProduct
} from "../services/productService";

import toast from "react-hot-toast";

import {
  Trash2,
  Package,
  Upload,
  Search
} from "lucide-react";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [csvFile, setCsvFile] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [formData, setFormData] =
    useState({

      productName: "",
      stock: "",
      lastSoldDate: "",
      expiryDate: "",
      monthlySales: "",
      price: ""

    });



  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const data =
          await getProducts();

        setProducts(data);

      }

      catch {

        toast.error(
          "Failed to fetch products"
        );

      }

      finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchProducts();

  }, []);



  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };



  // =========================
  // CREATE PRODUCT
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createProduct(
          formData
        );

        toast.success(
          "Product Added Successfully"
        );

        fetchProducts();

        setFormData({

          productName: "",
          stock: "",
          lastSoldDate: "",
          expiryDate: "",
          monthlySales: "",
          price: ""

        });

      }

      catch {

        toast.error(
          "Failed To Create Product"
        );

      }

    };



  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete =
    async (id) => {

      try {

        await deleteProduct(id);

        toast.success(
          "Product Deleted"
        );

       await fetchProducts();

      }

      catch {

        toast.error(
          "Delete Failed"
        );

      }

    };



  // =========================
  // CSV UPLOAD
  // =========================

  const handleCSVUpload =
    async () => {

      if (!csvFile) {

        return toast.error(
          "Select CSV file"
        );

      }

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          csvFile
        );

        const response =
          await fetch(

`${import.meta.env.VITE_API_URL}/upload/csv`,            {

              method: "POST",

              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem("token")}`

              },

              body: formData

            }

          );

        const data =
          await response.json();

        toast.success(
          data.message
        );

        fetchProducts();

      }

      catch {

        toast.error(
          "CSV Upload Failed"
        );

      }

    };



// =========================
// SEARCH FILTER
// =========================

const filteredProducts =
products.filter(

product=>

product.productName
?.toLowerCase()
.includes(

search.toLowerCase()

)

);


// =========================
// FORM VALIDATION
// =========================

const isFormValid =

formData.productName.trim() !== ""

&&

formData.stock !== ""

&&

formData.lastSoldDate !== ""

&&

formData.expiryDate !== ""

&&

formData.monthlySales !== ""

&&

formData.price !== "";


// =========================
// RETURN
// =========================



  return (

<div className="flex bg-slate-950 text-white min-h-screen">

<Sidebar />

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
<Navbar />



{/* HEADER */}

<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
<div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center">

<Package className="text-black"/>

</div>

<div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
Inventory Products

</h1>

<p className="text-slate-400 mt-1">

AI Powered Inventory Management

</p>

</div>

</div>



<p className="text-slate-400 text-sm mt-3">

CSV format must contain:

productName, stock, lastSoldDate,

expiryDate, monthlySales, price

</p>



{/* CSV */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-10">

<h2 className="text-2xl font-bold mb-6">

Upload Products CSV

</h2>

<div className="flex flex-col lg:flex-row gap-4">
<input

type="file"
accept=".csv"

onChange={(e)=>

setCsvFile(
e.target.files[0]
)

}

className="
w-full
bg-slate-800
border
border-slate-700
p-4
rounded-2xl
"

/>

<button

onClick={handleCSVUpload}

className="
bg-cyan-500
hover:bg-cyan-400
text-black
font-bold
px-6
py-4
rounded-2xl
flex
items-center
gap-2
"

>

<Upload size={20}/>

Upload CSV

</button>

</div>

</div>



{/* FORM */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">

<h2 className="text-2xl font-bold mb-8">

Add Product

</h2>

<form
onSubmit={handleSubmit}
className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

<input
type="text"
name="productName"
placeholder="Product Name"
value={formData.productName}
onChange={handleChange}
className="
w-full
bg-slate-800
p-4
rounded-2xl
"required
/>

<input
type="number"
name="stock"
placeholder="Stock"
value={formData.stock}
onChange={handleChange}
className="
w-full
bg-slate-800
p-4
rounded-2xl
"
required
/>

<input
type="date"
name="lastSoldDate"
value={formData.lastSoldDate}
onChange={handleChange}
className="
w-full
bg-slate-800
p-4
rounded-2xl
"required
/>

<input
type="date"
name="expiryDate"
value={formData.expiryDate}
onChange={handleChange}
className="
w-full
bg-slate-800
p-4
rounded-2xl
"required
/>

<input
type="number"
name="monthlySales"
placeholder="Monthly Sales"
value={formData.monthlySales}
onChange={handleChange}
className="
w-full
bg-slate-800
p-4
rounded-2xl
"required
/>

<input
type="number"
name="price"
placeholder="Price"
value={formData.price}
onChange={handleChange}
className="
w-full
bg-slate-800
p-4
rounded-2xl
"required
/>

<button

type="submit"

disabled={!isFormValid}

className={`

py-4
rounded-2xl
font-bold
xl:col-span-3
transition-all
duration-300

${
isFormValid

?

"bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer"

:

"bg-slate-700 text-slate-400 cursor-not-allowed"

}

`}

>

Add Product

</button>

</form>

</div>



{/* PRODUCTS TABLE */}

{/* PRODUCT TABLE */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">

{/* Header + Search */}

<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

<h2 className="text-2xl font-bold">

Inventory Products

</h2>

<div className="relative w-full lg:w-80">
<Search
size={18}
className="
absolute
left-3
top-4
text-slate-400
"
/>

<input

type="text"

placeholder="Search Product"

value={search}

onChange={(e)=>
setSearch(
e.target.value
)
}

className="
w-full
bg-slate-800
border
border-slate-700
rounded-xl
py-3
pl-10
pr-4
outline-none
focus:border-cyan-500
"

/>

</div>

</div>


{

loading ?

<div className="text-center py-10">

Loading Products...

</div>

:

<div className="overflow-x-auto rounded-2xl">
<table className="w-full">

<thead>

<tr className="border-b border-slate-700 text-left">

<th className="p-4">
Product
</th>

<th className="p-4">
Stock
</th>

<th className="p-4">
Last Sold
</th>

<th className="p-4">
Expiry
</th>

<th className="p-4">
Monthly Sales
</th>

<th className="p-4">
Price
</th>

<th className="p-4">
Actions
</th>

</tr>

</thead>

<tbody>

{

filteredProducts.length > 0 ?

filteredProducts.map(

(product)=>(

<tr

key={product._id}

className="
border-b
border-slate-800
hover:bg-slate-800/40
transition-all
"

>

<td className="p-4 font-semibold">

{product.productName}

</td>

<td className="p-4">

{product.stock}

</td>

<td className="p-4">

{

product.lastSoldDate

?

new Date(

product.lastSoldDate

)

.toLocaleDateString(
"en-GB"
)

:

"-"

}

</td>

<td className="p-4">

{

product.expiryDate

?

new Date(

product.expiryDate

)

.toLocaleDateString(
"en-GB"
)

:

"-"

}

</td>

<td className="p-4">

{product.monthlySales}

</td>

<td className="p-4">

₹{product.price}

</td>

<td className="p-4">

<button

onClick={()=>

handleDelete(
product._id
)

}

className="
bg-red-500
hover:bg-red-400
transition-all
duration-300
px-3
sm:px-4
py-2
rounded-xl
flex
items-center
gap-2
text-sm
"

>

<Trash2
size={18}
/>

Delete

</button>

</td>

</tr>

)

)

:

<tr>

<td
colSpan="7"
className="
text-center
p-10
text-slate-400
"
>

No products found

</td>

</tr>

}

</tbody>

</table>

</div>

}
</div>

</div>

</div>

);

}

export default Products;