import React from "react";
import style from "./css/Enquiry.module.css";
import Header from "./layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";

const Enquiry = () => {
  return (
    <> 
      <Header />
      <Outlet />
      <div className="body_into">
        <p className={style.p}>문의사항 창 입니다.</p>
      </div>
      <Footer />
    </>
  )
};

export default Enquiry;
