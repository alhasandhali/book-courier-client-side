import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Root = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar></Navbar>
      <div key={location.pathname} className="page-transition">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
