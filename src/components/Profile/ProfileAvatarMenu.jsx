import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  Shield,
  ChevronDown,
} from "lucide-react";
import profileAvatar from "../../assets/profile-avatar.jpg";
import useAuthStore from "../../zustang/useAuthStore";

const ProfileAvatar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const email = useAuthStore((state) => state.email);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  //Close menu when click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      action: () => navigate("/profile"),
    },
    {
      icon: Settings,
      label: "Settings",
      action: () => console.log("Settings clicked"),
    },

    {
      icon: CreditCard,
      label: "Billing",
      action: () => console.log("Billing clicked"),
    },

    { separator: true },
    {
      icon: LogOut,
      label: "Logout",
      action: () => logout(),
      danger: true,
    },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00a8c4] focus:ring-offset-2 rounded-full"
      >
        <img
          className="w-10 h-10 rounded-full p-1 object-cover"
          src={profileAvatar}
          alt="Profile"
        />
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute bg-white top-full mt-2 w-56 rounded-lg shadow-lg z-50 left-0 md:left-auto md:right-0">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={profileAvatar}
                  alt="Profile"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 ">
                    {email.slice(0, 3).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 ">{email}</p>
                </div>
              </div>
            </div>

            {menuItems.map((item, index) => {
              if (item.separator) {
                return <hr key={index} className="my-1 border-gray-200 " />;
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50 "
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
