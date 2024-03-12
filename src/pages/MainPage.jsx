import VideoEditor from "components/video/VideoEditor";
import React from "react";
import Header from "./layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";

const MainPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <VideoEditor />
      <Footer />
    </>
  );
};

export default MainPage;
