import {

  useEffect,
  useState

} from "react";

import Sidebar from "../components/dashboard/Sidebar";

import Navbar from "../components/dashboard/Navbar";

import {

  getUsers,
  removeUser,
  downloadProducts

} from "../services/adminService";

import toast from "react-hot-toast";

import {

  Trash2,
  Users as UsersIcon,
  Search,
  Download

} from "lucide-react";

import Papa from "papaparse";

import { saveAs } from "file-saver";

function Users() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers =
    async () => {

      try {

        const data =
          await getUsers();

        setUsers(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load users"
        );
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  // =========================
  // DELETE USER
  // =========================

  const handleDelete =
    async (id) => {

      const adminPassword =
        prompt(
          "Enter admin password"
        );

      if (!adminPassword)
        return;

      try {

        await removeUser(

          id,

          adminPassword
        );

        toast.success(
          "User deleted successfully"
        );

        fetchUsers();

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Delete failed"
        );
      }
    };

  // =========================
  // DOWNLOAD PRODUCTS CSV
  // =========================

  const handleDownload =
    async (
      id,
      name
    ) => {

      try {
        const response =
  await downloadProducts(id);

const products =
  response.products || response;

if (
  !Array.isArray(products)
) {

  return toast.error(
    "Invalid products data"
  );
}

if (
  products.length === 0
) {

  return toast.error(
    "No products found"
  );
}
       

        // =========================
        // FORMAT CSV DATA
        // =========================

        const formattedData =
          products.map(

            (product) => ({

              "Product Name":
                product.productName,

              "Stock":
                product.stock,

              "Price":
                product.price,

              "Monthly Sales":
                product.monthlySales,

              "Risk":
                product.risk,

              "Suggestion":
                product.suggestion,

              "AI Campaign":
                product.aiCampaign,

              "Last Sold Date":
                new Date(

                  product.lastSoldDate

                ).toLocaleDateString(
                  "en-GB"
                ),

              "Expiry Date":
                new Date(

                  product.expiryDate

                ).toLocaleDateString(
                  "en-GB"
                ),

              "Created At":
                new Date(

                  product.createdAt

                ).toLocaleString(
                  "en-GB"
                ),
            })
          );

        // =========================
        // CONVERT TO CSV
        // =========================

        const csv =
          Papa.unparse(
            formattedData
          );

        // =========================
        // CREATE FILE
        // =========================

        const blob =
          new Blob(

            [csv],

            {

              type:
                "text/csv;charset=utf-8;",
            }
          );

        // =========================
        // DOWNLOAD FILE
        // =========================

        saveAs(

          blob,

          `${name}-products.csv`
        );

        toast.success(
          "Products downloaded"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Download failed"
        );
      }
    };

  // =========================
  // FILTER USERS
  // =========================

  const filteredUsers =
    users.filter((user) =>

      user.name
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-72 p-8 overflow-y-auto">

        <Navbar />

        {/* HEADER */}

        <div className="flex items-center gap-4 mt-8">

          <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center">

            <UsersIcon
              className="text-black"
              size={30}
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold">

              Users Management

            </h1>

            <p className="text-slate-400 mt-2">

              Total Users:
              {" "}
              {users.length}

            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="mt-8 relative max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e) =>

              setSearch(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-slate-700 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-cyan-500"
          />

        </div>

        {/* USERS TABLE */}

        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="p-5 text-left">

                  Name

                </th>

                <th className="p-5 text-left">

                  Email

                </th>

                <th className="p-5 text-left">

                  Products

                </th>

                <th className="p-5 text-left">

                  Download

                </th>

                <th className="p-5 text-left">

                  Delete

                </th>

              </tr>

            </thead>

            <tbody>

              {

                filteredUsers.length > 0 ? (

                  filteredUsers.map(

                    (user) => (

                      <tr
                        key={user._id}
                        className="border-t border-slate-800 hover:bg-slate-800/40 transition-all duration-300"
                      >

                        {/* NAME */}

                        <td className="p-5 font-semibold">

                          {user.name}

                        </td>

                        {/* EMAIL */}

                        <td className="p-5 text-slate-300">

                          {user.email}

                        </td>

                        {/* PRODUCTS COUNT */}

                        <td className="p-5">

                          <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl font-semibold">

                            {

                              user.productsCount || 0

                            }

                          </span>

                        </td>

                        {/* DOWNLOAD */}

                        <td className="p-5">

                          <button
                            onClick={() =>

                              handleDownload(

                                user._id,

                                user.name
                              )
                            }
                            className="bg-green-500 hover:bg-green-400 transition-all duration-300 p-3 rounded-xl"
                          >

                            <Download
                              size={18}
                            />

                          </button>

                        </td>

                        {/* DELETE */}

                        <td className="p-5">

                          <button
                            onClick={() =>

                              handleDelete(
                                user._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-400 transition-all duration-300 p-3 rounded-xl"
                          >

                            <Trash2
                              size={18}
                            />

                          </button>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center p-10 text-slate-400"
                    >

                      No users found

                    </td>

                  </tr>
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Users;