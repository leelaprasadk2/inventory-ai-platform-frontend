import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Campaigns from "./pages/Campaigns";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

import ProtectedRoute from "./utils/ProtectedRoute";

import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

return(

<Routes>

{/* AUTH */}

<Route
path="/"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/verify-email/:token"
element={<VerifyEmail/>}
/>

<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>

<Route
path="/reset-password/:token"
element={<ResetPassword/>}
/>


{/* PROTECTED */}

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/products"
element={
<ProtectedRoute>
<Products/>
</ProtectedRoute>
}
/>

<Route
path="/campaigns"
element={
<ProtectedRoute>
<Campaigns/>
</ProtectedRoute>
}
/>

<Route
path="/notifications"
element={
<ProtectedRoute>
<Notifications/>
</ProtectedRoute>
}
/>

<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>

<Route
path="/users"
element={
<ProtectedRoute>
<Users/>
</ProtectedRoute>
}
/>


{/* FALLBACK */}

<Route
path="*"
element={<Navigate to="/" replace/>}
/>

</Routes>

);

}

export default App;