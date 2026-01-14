import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNotificationStore } from "../store/useNotificationStore";

const Layout = ({ children, showSidebar = false }) => {
  const { increment } = useNotificationStore();

  // (future-ready hook for call notifications)
  useEffect(() => {
    // yahan future me call.ringing etc add kar sakte ho
  }, [increment]);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
