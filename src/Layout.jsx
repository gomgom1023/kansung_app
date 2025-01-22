import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LenisContext } from "./App"; // LenisContext 가져오기
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { HeaderContext } from "./State/HeaderContext.jsx";

const Layout = () => {
  const { setHeaderClass } = useContext(HeaderContext);
  const lenis = useContext(LenisContext); // Lenis 가져오기
  const location = useLocation();

  useEffect(() => {
    const isMainPage = location.pathname === "/";
    console.log(`Page path: ${location.pathname}`);

    if (isMainPage) {
      console.log("Main Page Detected: Resetting headerClass");
      setHeaderClass("");
    } else {
      console.log("Sub Page Detected: Applying sub_class");
      setHeaderClass("sub_class");
    }
  }, [location.pathname, setHeaderClass]);

  useEffect(() => {
    console.log("Trying to scroll to top...");
    if (lenis) {
      console.log("Using Lenis for scrolling...");
      lenis.scrollTo(0, { duration: 1 }); // Lenis로 스크롤 최상단 이동
    } else {
      console.log("Lenis not available. Falling back to window.scrollTo...");
      window.scrollTo(0, 0); // Fallback
    }
  }, [lenis, location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
