import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-os text-encre flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20" data-testid="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
