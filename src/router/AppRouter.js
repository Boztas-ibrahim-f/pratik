import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import { auth } from "../firebase";


export default function AppRouter() {
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setIsLoading(user)
      } else {
        setIsLoading(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  console.log(isLoading)
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
