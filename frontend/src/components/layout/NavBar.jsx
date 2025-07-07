import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import { RiMenu2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, token, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-white text-black pl-5 pr-5 bg-base-100 h-[80px] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 20 18"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg> */}
            <RiMenu2Fill className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            // dropdown-content
            className="menu bg-white text-black menu-sm dropdown-content font-medium text-md gap-2  bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow"
          >
            <Link
              to="/"
              className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-1"
            >
              Homepage
            </Link>
            <li className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-1">
              Portfolio
            </li>
            <Link
              to="/about"
              className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-1"
            >
              About
            </Link>
            {token && user?.role == "admin" ? (
              <>
                <Link
                  to="/CreateNews"
                  className="hidden lg:block lg:hover:cursor-pointer lg:hover:bg-gray-300 lg:hover:rounded-sm lg:p-1"
                >
                  Create News
                </Link>
                <Link
                  to="/MyNews"
                  className="hidden lg:block lg:hover:cursor-pointer lg:hover:bg-gray-300 lg:hover:rounded-sm lg:p-1"
                >
                  My News
                </Link>
              </>
            ) : (
              ""
            )}
            {token ? (
              <li
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to logout?"
                  );
                  if (confirmed) {
                    logout();
                  }
                }}
                className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-1"
              >
                Logout
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
      <div className="lg:navbar-center">
        <div className="flex items-center text-black font-bold text-3xl">
          <span>Last</span>
          <img
            src="/logo.png"
            alt="Last24Hrs Logo"
            className="w-14 h-auto object-contain"
          />
          <span>Hrs</span>
        </div>
      </div>

      <div className="hidden lg:navbar-end lg:flex lg:gap-2">
        {token ? (
          <div
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to logout?"
              );
              if (confirmed) {
                logout();
                toast.success("You have been logged out!");
              }
            }}
            className="btn border-none bg-none textarea-lg hover:bg-black hover:text-white"
          >
            Logout
          </div>
        ) : (
          <>
            <Link to="/SignUp" className="btn textarea-lg">
              Register
            </Link>
            <Link
              to="/login"
              className="btn border-none bg-none textarea-lg hover:bg-black hover:text-white"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
      {/* small */}

      <div className="lg:hidden  navbar-end  dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <FaRegUser className="text-xl" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-white text-black mt-30 menu bg-base-100 rounded-box shadow z-10 w-35 p-3"
        >
          {token ? (
            <div
              className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-2"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to logout?"
                );
                if (confirmed) {
                  logout();
                  toast.success("You have been logged out!");
                }
              }}
            >
              Logout
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-2"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-2"
              >
                Register
              </Link>
            </>
          )}

          {user?.role == "admin" && (
            <>
              <Link
                to="/CreateNews"
                className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-2"
              >
                Create News
              </Link>
              <Link
                to="/MyNews"
                className="hover:cursor-pointer hover:bg-gray-300 hover:rounded-sm p-2"
              >
                My News
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
