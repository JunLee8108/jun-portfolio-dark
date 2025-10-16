import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const Navbar = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false);
  const [isAppsMobileOpen, setIsAppsMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Apps list - easy to extend in the future
  const apps = [
    { name: "DiaryFriend", path: "/diaryfriend" },
    // Add more apps here in the future
  ];

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setIsAppsDropdownOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleAppClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsAppsDropdownOpen(false);
    setIsAppsMobileOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAppsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed px-8 top-0 w-full bg-gray-950/90 backdrop-blur-sm z-40 border-b border-gray-900">
      <div className="max-w-6xl mx-auto py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="text-lg text-white font-medium tracking-tight"
          >
            Jeong Hyun<span className="text-cyan-500">.</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: "About", id: "about" },
              { name: "Work", id: "work" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide transition-colors ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Apps Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsAppsDropdownOpen(true)}
              onMouseLeave={() => setIsAppsDropdownOpen(false)}
            >
              <button
                onClick={() => setIsAppsDropdownOpen(!isAppsDropdownOpen)}
                className="text-sm tracking-wide text-gray-500 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Apps</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isAppsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isAppsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                    {apps.map((app) => (
                      <button
                        key={app.path}
                        onClick={() => handleAppClick(app.path)}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm tracking-wide transition-colors ${
                activeSection === "contact"
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-900">
          <div className="px-8 py-6 space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left py-2 text-gray-400 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="block w-full text-left py-2 text-gray-400 hover:text-white transition-colors"
            >
              Work
            </button>

            {/* Apps Accordion */}
            <div>
              <button
                onClick={() => setIsAppsMobileOpen(!isAppsMobileOpen)}
                className="flex items-center justify-between w-full py-2 text-gray-400 hover:text-white transition-colors"
              >
                <span>Apps</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isAppsMobileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mobile Apps Submenu */}
              {isAppsMobileOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {apps.map((app) => (
                    <button
                      key={app.path}
                      onClick={() => handleAppClick(app.path)}
                      className="block w-full text-left py-2 text-gray-500 hover:text-cyan-500 transition-colors text-sm"
                    >
                      {app.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
