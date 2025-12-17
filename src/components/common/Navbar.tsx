import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Partners", to: "/partners" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `lg:text-xl xl:text-2xl transition hover:text-[#F80B58] ${
      isActive ? "text-[#F80B58]" : "text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md py-3 z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {pathname !== "/" ? (
            <div
              onClick={() => navigate("/")}
              className="text-2xl md:text-3xl lg:text-[40px] font-abc-ultra-3 bold-stroke tracking-[1px] md:tracking-[2px] text-white font-bold cursor-pointer"
            >
              OLIM PASS
            </div>
          ) : (
            <div></div>
          )}

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center gap-8">
            {navItems.map(
              (item) =>
                pathname !== item.to && (
                  <NavLink key={item.to} to={item.to} className={linkClasses}>
                    {item.label}
                  </NavLink>
                )
            )}
          </div> */}

          {/* Desktop Buttons */}
          <div className="hidden md:block">
            <div className="flex gap-3 justify-center items-center">

              {/* <button
                onClick={() => navigate("/dashboard/login")}
                className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
              >
                Admin Login
              </button> */}
              
            {pathname !== "/" && pathname !== "/register" && (
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
              >
                Sign Up
              </button>
            )}
            {pathname !== "/redeem" && (
              <button
                onClick={() => navigate("/redeem")}
                className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
              >
                Redeem
              </button>
            )}
            {pathname !== "/contact" && (
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
              >
                Contact
              </button>
            )}
          </div>

          </div>
          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition cursor-pointer"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-4 space-y-3">
            <div className="flex flex-col gap-3">
              {/* {navItems.map(
                (item) =>
                  pathname !== item.to && (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block lg:text-xl xl:text-2xl py-2 hover:text-[#F80B58] transition ${
                          isActive ? "text-[#F80B58]" : "text-white"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
              )} */}

             <div className="flex flex-col w-min gap-3">
               {pathname !== "/" && pathname !== "/register" && (
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
                >
                  Sign Up
                </button>
              )}
              {pathname !== "/redeem" && (
                <button
                  onClick={() => {
                    navigate("/redeem");
                    setIsOpen(false);
                  }}
                  className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
                >
                  Redeem
                </button>
              )}
              {pathname !== "/contact" && (
                <button
                  onClick={() => {
                    navigate("/contact");
                    setIsOpen(false);
                  }}
                  className="px-6 py-2 border-2 text-lg cursor-pointer text-white border-white rounded-full hover:bg-white hover:text-black transition font"
                >
                  Contact
                </button>
              )}
             </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
