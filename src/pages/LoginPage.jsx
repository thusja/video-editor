import React from "react";
import style from "./css/Login.module.css";
import Header from "./layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";

const LoginPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="body_into">
        <p className={style.p}>로그인 창 입니다.</p>
      </div>
      <Footer />
    </>
  )
};

export default LoginPage;
