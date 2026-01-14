import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useNotificationStore } from "../store/useNotificationStore";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { unreadCount, reset } = useNotificationStore();
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 flex items-center w-full">
        {isChatPage && (
          <Link to="/" className="flex items-center gap-2">
            <ShipWheelIcon className="size-8 text-primary" />
            <span className="text-2xl font-bold">Streamify</span>
          </Link>
        )}

        <div className="ml-auto flex items-center gap-4">
          {/* 🔔 Notification Icon */}
          <Link to="/notifications" onClick={reset}>
            <div className="relative">
              <BellIcon className="h-6 w-6 opacity-70" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          </Link>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt="avatar"
                onError={(e) => {
                  e.target.src = "/avatar.png";
                }}
              />

            </div>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
