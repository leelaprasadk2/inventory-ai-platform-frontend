import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";

import Navbar from "../components/dashboard/Navbar";

import toast from "react-hot-toast";

import {
  User,
  Mail,
  Shield,
  Save,
  Upload,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../services/userService";

function Profile() {

  const [user, setUser] =
    useState({

      name: "",

      email: "",

      role: "",

      profilePic: "",
    });

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [previewImage, setPreviewImage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        setUser(data);

        setPreviewImage(
          data.profilePic || ""
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load profile"
        );
      }
    };

  useEffect(() => {

    fetchProfile();

  }, []);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange =
    (e) => {

      setUser({

        ...user,

        [e.target.name]:
          e.target.value,
      });
    };

  // =========================
  // HANDLE IMAGE
  // =========================

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      if (file) {

        setSelectedImage(file);

        setPreviewImage(

          URL.createObjectURL(
            file
          )
        );
      }
    };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSave =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const formData =
          new FormData();

        // =========================
        // APPEND NAME
        // =========================

        formData.append(
          "name",
          user.name
        );

        // =========================
        // APPEND IMAGE
        // =========================

        if (selectedImage) {

          formData.append(

            "profilePic",

            selectedImage
          );
        }

        // =========================
        // API CALL
        // =========================

        const updatedUser =
          await updateProfile(
            formData
          );

        // =========================
        // UPDATE STATE
        // =========================

        setUser(updatedUser);

        setPreviewImage(

          updatedUser.profilePic
        );

        // =========================
        // LOCAL STORAGE
        // =========================

        localStorage.setItem(

          "user",

          JSON.stringify(
            updatedUser
          )
        );

        // =========================
        // LIVE NAVBAR UPDATE
        // =========================

        window.dispatchEvent(

          new Event(
            "profileUpdated"
          )
        );

        toast.success(
          "Profile updated successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(

          error?.response?.data?.message ||

          "Failed to update profile"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="flex bg-slate-950 text-white min-h-screen overflow-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

<div
className="
flex-1
lg:ml-72
overflow-y-auto
"
>
        <div className="p-4 sm:p-6 lg:p-8">

          <Navbar />

          {/* HEADER */}

<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">

              <User
                className="text-black"
                size={30}
              />

            </div>

            <div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Profile Settings

              </h1>

              <p className="text-slate-400 mt-2">

                Manage your account information

              </p>

            </div>

          </div>

          {/* PROFILE CARD */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 mt-10 w-full max-w-5xl">
            {/* TOP SECTION */}

<div className="flex flex-col lg:flex-row lg:items-center gap-8">
              {/* PROFILE IMAGE */}

              <div className="flex justify-center">

                {

                  previewImage ? (

                    <img
                      src={previewImage}
                      alt="Profile"
className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-cyan-500 shadow-xl shadow-cyan-500/20"                    />

                  ) : (

<div
className="
w-24
h-24
sm:w-32
sm:h-32
rounded-full
bg-cyan-500
flex
items-center
justify-center
text-black
text-4xl
sm:text-5xl
font-bold
uppercase
"
>

{user.name?.charAt(0)}

</div>
                  )
                }

              </div>

              {/* USER INFO */}

              <div className="flex-1">

<h2 className="text-2xl sm:text-3xl font-bold break-words">
                  {user.name}

                </h2>

                <p className="text-slate-400 mt-2 break-all">

                  {user.email}

                </p>

                <div className="mt-5 inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-5 py-2 rounded-2xl text-sm font-semibold border border-cyan-500/20">

                  <Shield size={16} />

                  {user.role}

                </div>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSave}
              className="mt-10 space-y-7"
            >

              {/* NAME */}

              <div>

                <label className="text-sm text-slate-400 mb-2 block">

                  Full Name

                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full bg-slate-800 border border-slate-700 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-cyan-500 transition-all"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="text-sm text-slate-400 mb-2 block">

                  Email Address

                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-slate-800 border border-slate-700 pl-12 pr-4 py-4 rounded-2xl text-slate-400 cursor-not-allowed"
                  />

                </div>

              </div>

              {/* IMAGE */}

              <div>

                <label className="text-sm text-slate-400 mb-3 block">

                  Upload Profile Image

                </label>

                <label className="flex items-center justify-center gap-3 bg-slate-800 border border-slate-700 hover:border-cyan-500 transition-all duration-300 rounded-2xl p-5 cursor-pointer">

                  <Upload size={20} />

                  <span className="font-medium">

                    {

                      selectedImage

                        ? selectedImage.name

                        : "Choose Profile Image"
                    }

                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

              </div>

              {/* ROLE */}

              <div>

                <label className="text-sm text-slate-400 mb-2 block">

                  Role

                </label>

                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-slate-400 cursor-not-allowed"
                />

              </div>

              {/* SAVE BUTTON */}

              <button
                type="submit"
                disabled={loading}
className="
bg-cyan-500
hover:bg-cyan-400
transition-all
duration-300
text-black
font-bold
w-full
sm:w-auto
px-8
py-4
rounded-2xl
flex
justify-center
items-center
gap-3
disabled:opacity-70
"              >

                <Save size={20} />

                {

                  loading

                    ? "Saving..."

                    : "Save Changes"
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;