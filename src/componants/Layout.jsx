import React from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

export default function Layout({ children, title }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Navbar title={title} />
        {children}
      </main>
    </div>
  );
}
