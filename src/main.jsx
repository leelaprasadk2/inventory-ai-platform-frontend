import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(

  document.getElementById("root")

).render(

  <React.StrictMode>

    <GoogleOAuthProvider

      clientId={
        import.meta.env
        .VITE_GOOGLE_CLIENT_ID
      }

    >

      <BrowserRouter>

        <AuthProvider>

          <Toaster
            position="top-right"
          />

          <App />

        </AuthProvider>

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>

);