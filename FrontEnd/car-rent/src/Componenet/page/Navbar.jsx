import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import carRentlogo from "../../assets/carRentlogo.jpg";
import closeIcon from "../../assets/close-icon.png";
import menuIcon from "../../assets/menu-icon.jpg";
import search from "../../assets/search-icon.avif";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];
  const { user: clerkUser } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [useradmin, setUseradmin] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");

    setUser(
      storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null
    );
    setUseradmin(
      storedAdmin && storedAdmin !== "undefined" ? JSON.parse(storedAdmin) : null
    );
  }, [location]);
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };
  useEffect(() => {
  if (useradmin) {
    toast.success("Admin logged in successfully");
  }
}, [useradmin]);
 useEffect(() => {
  if (user) {
    toast.success("user logged in successfully");
  }
}, [user]);


  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    setUseradmin(null);
    setDropdownOpen(false);
    toast.success("Admin logged out successfully");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
          className={`sticky top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 z-50 transition-all duration-500 ${
    isScrolled
      ? "bg-transparent bg-clip-text bg-gradient-to-b from-green-400 to-blue-500 shadow-lg backdrop-blur-md py-3 md:py-4"
      : "bg-transparent py-4 md:py-6 shadow-none backdrop-blur-0"
        }`}

    >
      {/* Logo */}
      <Link to="/">
        <img
          src={carRentlogo}
          alt="Car Rent Logo"
          className="h-14 md:h-16 object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`group flex flex-col gap-0.5 font-medium transition-colors ${
              isActive(link.path)
                ? isScrolled
                  ? "text-black"
                  : "text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-blue-500 font-semibold"
                : isScrolled
                ? "text-gray-700"
                : "text-transparent bg-clip-text bg-gradient-to-b from-green-900 to-blue-500 font-semibold"
            }`}
          >
            {link.name}
            <div
              className={`h-0.5 transition-all duration-300 ${
                isScrolled ? "bg-gray-700" : "bg-white"
              } ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}
            />
          </Link>
        ))}

        {/* Admin Section */}
        <div className="relative flex items-center ">
          {useradmin && (
            <span className={`font-medium ${isScrolled ? "text-black" : "text-white"} text-center bg-emerald-300 px-3 py-1 rounded ml-auto`}>
              Hello, {useradmin?.Fname}
            </span>
              )}
          {useradmin ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-red-600 text-red-600 px-4 py-1.5 text-sm rounded-full hover:bg-red-600 hover:text-white transition">  
                Logout Admin
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg flex flex-col z-50">
                  <Link
                    to="/admin/signup"
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                    
                  >
                    
                    Admin Signup
                  </Link>
                  <button
                    onClick={handleAdminLogout}
                    className="px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/admin/login"
              className={`border px-4 py-1.5 text-sm font-light rounded-full transition ${
                isScrolled
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-blue-800 text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-blue-500  hover:bg-white hover:text-black"
              }`}
            >
              Admin
            </Link>
          )}
        </div>
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => navigate("/search")}
          aria-label="Search cars"
          className="p-1"
        >
          <img
            src={search}
            alt=""
            className={`h-6 w-6 ${isScrolled ? "invert" : "filter-white"}`}
          />
        </button>

        {/* User Login/Logout */}
        {user || clerkUser ? (
          <div className="flex items-center gap-3">
            <span className={`font-medium ${isScrolled ? "text-black" : "text-white"}`}>
              Hello, {user?.Fname || clerkUser?.firstName}
            </span>
            {user ? (
              <button
                onClick={handleLogout}
                className="border border-red-600 text-red-600 px-4 py-1.5 text-sm rounded-full hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <UserButton afterSignOutUrl="/login" />
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className={`border px-4 py-1.5 text-sm font-light rounded-full transition ${
              isScrolled
                ? "border-black text-black hover:bg-black hover:text-white"
                : "border-blue-900 text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-blue-500 font-semibold hover:bg-white hover:text-black"
            }`}
          >
            Login
          </Link>
        )}
      </div>

<div className="flex md:hidden">
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    aria-label="Toggle menu"
    className="p-1.5 sm:p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 transition-transform active:scale-95"
  >
    <img
      src={menuIcon}
      alt="Menu"
      className={`h-5 w-5 sm:h-6 sm:w-6 object-contain ${isScrolled ? "invert" : ""}`}
    />
  </button>
</div>

<div
  className={`
    fixed inset-0 bg-white flex flex-col items-center justify-center z-0
    p-6 sm:p-8 transition-all duration-300 ease-out md:hidden
    ${isMenuOpen 
      ? "opacity-100 scale-100" 
      : "opacity-0 scale-95 pointer-events-none"
    }
  `}
  style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
>
  {/* Close Button - Top Right */}
  <button
    onClick={() => setIsMenuOpen(false)}
    aria-label="Close menu"
    className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400 transition"
  >
    <img src={closeIcon} alt="Close" className="h-5 w-5 sm:h-6 sm:w-6" />
  </button>

  {/* Navigation Links - Centered, Responsive */}
  <nav className="flex flex-col gap-4 sm:gap-5 w-full max-w-xs sm:max-w-sm">
    {navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        onClick={() => setIsMenuOpen(false)}
        className={`
          w-full text-center py-3 px-5 rounded-xl font-medium text-sm sm:text-base
          transition-all active:scale-95 shadow-sm
          ${isActive(link.path)
            ? "bg-gradient-to-r from-green-500 to-blue-600 text-white"
            : "bg-gray-50 text-gray-800 hover:bg-gray-100 hover:shadow"
          }`}
      >
        {link.name}
      </Link>
    ))}
  </nav>

  <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-xs sm:max-w-sm mt-8">
    {useradmin ? (
      <button
        onClick={() => {
          handleAdminLogout();
          setIsMenuOpen(false);
        }}
        className="w-full py-3 px-5 rounded-xl bg-red-50 text-red-600 font-medium text-sm sm:text-base hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm"
      >
        Logout Admin
      </button>
    ) : (
      <Link
        to="/admin/login"
        onClick={() => setIsMenuOpen(false)}
        className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium text-sm sm:text-base hover:shadow transition-all active:scale-95"
      >
        Admin Login
      </Link>
    )}

    {/* User */}
    {user || clerkUser ? (
      <>
        {user ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="w-full py-3 px-5 rounded-xl bg-red-50 text-red-600 font-medium text-sm sm:text-base hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm"
          >
            Logout
          </button>
        ) : (
          <div className="flex justify-center">
            <UserButton afterSignOutUrl="/login" />
          </div>
        )}
      </>
    ) : (
      <Link
        to="/login"
        onClick={() => setIsMenuOpen(false)}
        className="w-full py-3 px-5 rounded-xl bg-gray-900 text-white font-medium text-sm sm:text-base hover:bg-black transition-all active:scale-95 shadow"
      >
        Login
      </Link>
    )}
  </div>
</div>  
  </nav>
  );
};

export default Navbar;
