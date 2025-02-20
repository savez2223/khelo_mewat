import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../../assets/logo/logo2.png";
import rlogo from "../../../assets/logo/rlogo2.png";
import useReadingProgress from "../../../hooks/useReadingProgress";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import ActiveLink from "../../../components/ActiveLink/ActiveLink";
import useCart from "../../../hooks/useCart";

const Navbar = ({ isHomePage }) => {
  const { user, role, logOut, theme, setTheme } = useContext(AuthContext);
  /* for scrolling progress  */
  const completion = useReadingProgress();
  /* const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); */
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [cart] = useCart();

  /* control nabar bg */
  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.pageYOffset > 120 ? "solid" : "transparent");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* control dark and night mode */
  /* useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    //store theme mode in local storage
    localStorage.setItem("theme", theme);
  }, [theme]); */

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
            <>
              <li>
                <Link to="/dashboard/selectedclasses">
                  <FaCartShopping className="text-xl" />
                  <div className="bg-amber-500 px-1.5 rounded-md text-white absolute -top-1 right-0">
                    {cart?.length || 0}
                  </div>
                </Link>
              </li>
            </>
          )}
          <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
            <img
              className="w-14 h-14 object-cover lg:mt-[-10px]  rounded-full dark:border-white border-red-600 border mx-4"
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
              }
              alt=""
            />
          </div>
          <button
            onClick={() => logOut()}
            className="btn-sm custom-btn ms-3 bg-amber-500  text-white rounded"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/signin">Sign in</Link>
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
      {/* for small device */}
      <div className="md:hidden bg-red-500 flex justify-center items-center py-2">
        <Link to="/">
          <img className="w-14" src={logo} alt="logo" />
        </Link>
      </div>
      <div
        className={`navbar top-0 transition-all ease-out duration-300 dark:bg-gray-800 text-white md:fixed z-50 py-3 md:px-8 ${
          !isHomePage
            ? "bg-white shadow-md "
            : navbarBg !== "transparent"
            ? "navbar_bg "
            : "lg:py-4 py-5"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost bg-red-500 lg:hidden hover:bg-red-600"
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-red-500 dark:bg-gray-700 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>

          <Link
            to="/"
            className="cursor-pointer normal-case text-xl hidden lg:block"
          >
            {navbarBg !== "transparent" ? (
              <img className="w-20" src={rlogo} alt="" />
            ) : !isHomePage ? (
              <img className="w-20" src={rlogo} alt="" />
            ) : (
              <img className="w-20" src={logo} alt="" />
            )}
          </Link>
        </div>
        <div className="navbar-center ">
          <ul
            className={`menu menu-horizontal px-1 font-semibold hidden lg:flex  ${
              navbarBg !== "transparent"
                ? "text-red-500 dark:text-white"
                : !isHomePage
                ? "text-red-500"
                : "text-white"
            }`}
          >
            {navOptions}
          </ul>
          {role === "Student" && (
            <div className="md:hidden relative">
              <Link to="/dashboard/selectedclasses">
                <FaCartShopping className="text-3xl text-red-500 " />
                <div className="bg-amber-500 px-1.5 rounded-md text-white absolute -top-3 -right-4">
                  {cart?.length || 0}
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="navbar-end lg:mt-[-10px]">
          <div className="dark:bg-dark  justify-center relative flex w-fit items-center rounded-full">
            <button
              className="toggle_class text-white dark:text-white"
              onClick={() => setTheme("light")}
            >
              <FiMoon className="relative z-10 text-lg md:text-sm" />
              <span className="relative z-10 hidden md:block">Light</span>
            </button>
            <button
              className={`toggle_class dark:text-white  ${
                navbarBg !== "transparent"
                  ? "text-red-500"
                  : !isHomePage
                  ? "text-red-500"
                  : "text-red-500 md:text-white"
              }`}
              onClick={() => setTheme("dark")}
            >
              <FiSun className="relative z-10 text-lg md:text-sm" />
              <span className="relative z-10 hidden md:block">Dark</span>
            </button>
            <div className="absolute inset-0 z-0 flex dark:justify-end justify-start">
              <motion.span
                layout
                transition={{ type: "spring", damping: 15, stiffness: 250 }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-red-500 to-yellow-500"
              />
            </div>
          </div>
        </div>
        <span
          style={{ transform: `translateX(${completion - 100}%)` }}
          className="hidden md:block absolute bg-gradient-to-r from-pink-500 via-yellow-500 to-transparent h-1 w-full bottom-0"
        />
      </div>
    </>
  );
};

export default Navbar;
