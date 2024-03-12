import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/Footer.module.css";
import pro from "assets/icons/pro.png";

const Footer = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/videoEditor");
  };

  const goLogin = () => {
    navigate("/Login");
  }

  const enquiry = () => {
    navigate("/Enquiry");
  }

  return (
      <div className={style.container}>
        <div className={style.logo}>
          <img src={pro} alt="logo" />

          <p className={style.p1}>
            Tel. &nbsp;&nbsp;&nbsp; 010-1234-5678 <br />
            E-mail qwer1234@naver.com
          </p>
        </div>

        <nav className={style.nav}>
          <ul className={style.ul}>
            <li className={style.li} onClick={goHome}>Video Edit</li>
            <li className={style.li} onClick={goLogin}>로그인</li>
            <li className={style.li} onClick={enquiry}>문의사항</li>
          </ul>
        </nav>
      </div>
  )
};

export default Footer;
