import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import AuthLayout from "../components/AuthLayout";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  useAuth
} from "../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [loading,setLoading] =
    useState(false);

  const [formData,setFormData] =
    useState({

      email:"",
      password:""

    });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };


  // =========================
  // NORMAL LOGIN
  // =========================

  const handleSubmit=
  async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const res=
      await API.post(

        "api//auth/login",

        formData

      );

      login(

        res.data.user,

        res.data.token

      );

      toast.success(

        "Login successful"

      );

      if(

        res.data.user.role
        === "admin"

      ){

        navigate(
          "/users"
        );

      }

      else{

        navigate(
          "/dashboard"
        );

      }

    }

    catch(error){

      console.log(error);

      toast.error(

        error.response
        ?.data
        ?.message ||

        "Login failed"

      );

    }

    finally{

      setLoading(false);

    }

  };


  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin=
  async(response)=>{

    try{

      const res=

      await API.post(

        "api/auth/google",

        {

          token:
          response.credential

        }

      );

      login(

        res.data.user,

        res.data.token

      );

      toast.success(

        "Google login successful"

      );

      navigate(
        "/dashboard"
      );

    }

    catch(error){

      toast.error(

        error.response
        ?.data
        ?.message ||

        "Google login failed"

      );

    }

  };


  return(

    <AuthLayout>

      <h1
      className="text-4xl font-bold text-center mb-2"
      >

        Inventory AI

      </h1>

      <p
      className="text-slate-300 text-center mb-8"
      >

        Smart Inventory Rescue Platform

      </p>


      <form
      onSubmit={handleSubmit}
      className="space-y-5"
      >

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

            value=
            {formData.email}

            onChange=
            {handleChange}

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

            value=
            {formData.password}

            onChange=
            {handleChange}

            required

            className=

            "w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 outline-none"

          />

        </div>


        {/* FORGOT PASSWORD */}

        <div
        className="text-right"
        >

          <Link

          to="/forgot-password"

          className=
          "text-cyan-400 text-sm"

          >

            Forgot Password?

          </Link>

        </div>


        {/* LOGIN BUTTON */}

        <button

          type="submit"

          disabled={loading}

          className=

          "w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 py-3 rounded-xl font-bold text-black"

        >

          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }

        </button>

      </form>


      {/* GOOGLE LOGIN */}

      <div
      className="mt-6 flex justify-center"
      >

        <GoogleLogin

          onSuccess={
            handleGoogleLogin
          }

          onError={()=>{

            toast.error(

              "Google Login Failed"

            );

          }}

        />

      </div>


      {/* REGISTER */}

      <p
      className="text-center mt-6"
      >

        Don't have account?

        <Link

          to="/register"

          className=
          "text-cyan-400 ml-2"

        >

          Register

        </Link>

      </p>

    </AuthLayout>

  );

}

export default Login;