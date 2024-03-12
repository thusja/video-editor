import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/Header.module.css";
import pro from "assets/icons/pro.png";

const Header = () => {
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
    <>
      <div className={style.container}>
        <div className={style.logo} onClick={goHome}>
          <img src={pro} alt="logo" />
        </div>

        <nav className={style.nav}>
          <ul className={style.ul}>
            <li className={style.li} onClick={goHome}><strong>Video Edit</strong></li>
            <li className={style.li} onClick={goLogin}><strong>로그인</strong></li>
            <li className={style.li} onClick={enquiry}><strong>문의사항</strong></li>
          </ul>
        </nav>
      </div>
    </>
  )
};

export default Header;
