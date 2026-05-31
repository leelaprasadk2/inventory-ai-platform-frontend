import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

import API from "../services/api";

import toast from "react-hot-toast";

function Register() {

  const navigate =
    useNavigate();

  const [loading,setLoading] =
    useState(false);

  const [formData,setFormData] =
    useState({

      name:"",
      email:"",
      password:""

    });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange =
  (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };


  // =========================
  // HANDLE REGISTER
  // =========================

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const res =
      await API.post(

        "/auth/register",

        formData

      );

      toast.success(

        res.data.message ||

        "Verification email sent"

      );

      // Clear form

      setFormData({

        name:"",
        email:"",
        password:""

      });

      // Redirect to login

      setTimeout(()=>{

        navigate("/");

      },1500);

    }

    catch(error){

      console.log(error);

      toast.error(

        error.response
        ?.data
        ?.message ||

        "Registration failed"

      );

    }

    finally{

      setLoading(false);

    }

  };


  return(

    <AuthLayout>

      {/* TITLE */}

      <h1
      className="text-4xl font-bold text-center mb-2"
      >

        Create Account

      </h1>

      <p
      className="text-slate-300 text-center mb-8"
      >

        Join Inventory AI Platform

      </p>


      {/* FORM */}

      <form

      onSubmit={handleSubmit}

      className="space-y-5"

      >

        {/* NAME */}

        <div>

          <label>

            Name

          </label>

          <input

            type="text"

            name="name"

            placeholder=
            "Enter name"

            value={
              formData.name
            }

            onChange={
              handleChange
            }

            required

            className=

            "w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 outline-none"

          />

        </div>


        {/* EMAIL */}

        <div>

          <label>

            Email

          </label>

          <input

            type="email"

            name="email"

            placeholder=
            "Enter email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            required

            className=

            "w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 outline-none"

          />

        </div>


        {/* PASSWORD */}

        <div>

          <label>

            Password

          </label>

          <input

            type="password"

            name="password"

            placeholder=
            "Enter password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            required

            minLength={6}

            className=

            "w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 outline-none"

          />

        </div>


        {/* BUTTON */}

        <button

          type="submit"

          disabled={loading}

          className=

          "w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 py-3 rounded-xl font-bold text-black"

        >

          {

            loading

            ?

            "Registering..."

            :

            "Register"

          }

        </button>

      </form>


      {/* LOGIN */}

      <p
      className="text-center mt-6"
      >

        Already have account?

        <Link

          to="/"

          className=
          "text-cyan-400 ml-2"

        >

          Login

        </Link>

      </p>

    </AuthLayout>

  );

}

export default Register;