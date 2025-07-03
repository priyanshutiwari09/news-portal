// src/components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Optional: Add Navbar here */}

      <main className="flex-grow">
        <Outlet /> {/* Will render NewsList, etc. */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
