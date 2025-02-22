import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../../assets/logo/logom.png";
import useReadingProgress from "../../../hooks/useReadingProgress";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import ActiveLink from "../../../components/ActiveLink/ActiveLink";
import useCart from "../../../hooks/useCart";

const Navbar = ({ isHomePage }) => {
  const { user, role, logOut, theme, setTheme } = useContext(AuthContext);
  const completion = useReadingProgress();
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [cart] = useCart();

  // Control navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.pageYOffset > 120 ? "solid" : "transparent");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navOptions = (
    <>
      <li>
        <ActiveLink to="/">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/courses">Games</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/aboutus">About Us</ActiveLink>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {role === "Student" && (
            <li className="relative">
              <Link to="/dashboard/selectedclasses">
                <FaCartShopping className="text-xl text-[#E87722]" />{" "}
                {/* Orange cart */}
                <span className="bg-[#E87722] px-1.5 rounded-md text-white absolute -top-1 right-0">
                  {cart?.length || 0}
                </span>
              </Link>
            </li>
          )}
          <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
            <img
              className="w-12 h-12 object-cover rounded-full border-2 border-[#E87722] mx-4" // Orange border
              src={
                user.photoURL ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
              }
              alt="User avatar"
            />
          </div>
          <button
            onClick={() => logOut()}
            className="btn btn-sm bg-[#E87722] hover:bg-[#d66b1c] text-white rounded-md"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-[#39A935] flex justify-center items-center py-2">
        <Link to="/">
          <img className="w-14" src={logo} alt="logo" />
        </Link>
      </div>
      <div
        className={`navbar top-0 transition-all ease-out duration-300 md:fixed z-50 py-3 md:px-8 ${
          !isHomePage
            ? "bg-white shadow-md"
            : navbarBg !== "transparent"
            ? "bg-white shadow-md"
            : "bg-transparent lg:py-4 py-5"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost bg-[#39A935] lg:hidden hover:bg-[#2d8a2d] text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#39A935] text-white rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="hidden lg:block">
            <img
              className={`${
                navbarBg !== "transparent" || !isHomePage ? "w-20" : "w-28"
              } transition-all duration-300`}
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-center">
          <ul
            className={`menu menu-horizontal px-1 font-semibold hidden lg:flex ${
              navbarBg !== "transparent" || !isHomePage
                ? "text-gray-700"
                : "text-white"
            }`}
          >
            {navOptions}
          </ul>
          {role === "Student" && (
            <div className="md:hidden relative">
              <Link to="/dashboard/selectedclasses">
                <FaCartShopping className="text-3xl text-[#E87722]" />
                <span className="bg-[#E87722] px-1.5 rounded-md text-white absolute -top-3 -right-4">
                  {cart?.length || 0}
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="navbar-end"></div>
        <span
          style={{ transform: `translateX(${completion - 100}%)` }}
          className="hidden md:block absolute bg-[#E87722] h-1 w-full bottom-0"
        />
      </div>
    </>
  );
};

export default Navbar;
